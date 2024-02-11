
import org.apache.log4j.{Level, Logger}
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions.{col, element_at, explode}

object ManageTrajectory {
  Logger.getLogger("org.spark_project").setLevel(Level.WARN)
  Logger.getLogger("org.apache").setLevel(Level.WARN)
  Logger.getLogger("akka").setLevel(Level.WARN)
  Logger.getLogger("com").setLevel(Level.WARN)

  def loadTrajectoryData(spark: SparkSession, filePath: String): DataFrame =
  {
    // Read JSON file into dataframe
    val read_df: DataFrame = spark.read.option("multiline","true").json(filePath)
    //    println(read_df.printSchema())
    val df2: DataFrame =  read_df.withColumn("trajectory", explode(read_df("trajectory")))
    //    println(df2.show(4))

    val preFinalDF: DataFrame = df2.withColumn("location", df2("trajectory.location"))
      .withColumn("timestamp", col("trajectory").getItem("timestamp"))
      .drop("trajectory")

    val finalDf: DataFrame = preFinalDF.withColumn("latitude", element_at(col("location"), 1))
      .withColumn("longitude", element_at(col("location"), 2))
//      .drop("location")
//    println(finalDf.show(4))

    finalDf.createOrReplaceTempView("final_data")
    val finalData: DataFrame = spark.sql("SELECT trajectory_id, vehicle_id, location, ST_POINT(latitude, longitude) AS point, timestamp FROM final_data")
//    println(finalData.show(4))

    finalData
  }

  def getSpatialRange(spark: SparkSession, dfTrajectory: DataFrame, latMin: Double, lonMin: Double, latMax: Double, lonMax: Double): DataFrame =
  {
    dfTrajectory.createOrReplaceTempView("trajectory_DF")
    val getSpatialRange_Output: DataFrame = spark.sql("""
         | SELECT trajectory_id, vehicle_id, Collect_List(timestamp) as timestamp, Collect_List(location) as location
         | FROM trajectory_DF
         | WHERE ST_Within(trajectory_DF.point, ST_PolygonFromEnvelope(%s, %s, %s, %s))
         | GROUP BY trajectory_id, vehicle_id
         |"""
      .format(latMin.toString, lonMin.toString, latMax.toString, lonMax.toString).stripMargin)

    getSpatialRange_Output
  }

  def getSpatioTemporalRange(spark: SparkSession, dfTrajectory: DataFrame, timeMin: Long, timeMax: Long, latMin: Double, lonMin: Double, latMax: Double, lonMax: Double): DataFrame =
  {
    dfTrajectory.createOrReplaceTempView("trajectory_temporal_DF")
    val getSpatioTemporalRange_Output: DataFrame = spark.sql("""
          | SELECT trajectory_id, vehicle_id, Collect_List(timestamp) as timestamp, Collect_List(location) as location
          | FROM trajectory_temporal_DF AS TTDF
          | WHERE TTDF.timestamp between %s and %s
          | AND ST_Within(TTDF.point, ST_PolygonFromEnvelope(%s, %s, %s, %s))
          | GROUP BY trajectory_id, vehicle_id
          |"""
      .format(timeMin.toString, timeMax.toString, latMin.toString, lonMin.toString, latMax.toString, lonMax.toString).stripMargin)

    getSpatioTemporalRange_Output
  }

  def getKNNTrajectory(spark: SparkSession, dfTrajectory: DataFrame, trajectoryId: Long, neighbors: Int): DataFrame =
  {
    dfTrajectory.createOrReplaceTempView("trajectory_KNN_DF")
    val getKNNTrajectory_Output: DataFrame = spark.sql("""
           | SELECT table_2.trajectory_id, Min(ST_Distance(table_1.point, table_2.point)) as minimum_distance
           | FROM trajectory_KNN_DF AS table_1, trajectory_KNN_DF AS table_2
           | WHERE table_1.trajectory_id = %d AND table_2.trajectory_id != %d
           | GROUP BY table_2.trajectory_id
           | ORDER BY minimum_distance, table_2.trajectory_id
           | ASC LIMIT %d
           |"""
      .format(trajectoryId, trajectoryId, neighbors).stripMargin)
      .drop("minimum_distance")

    getKNNTrajectory_Output
  }
}
