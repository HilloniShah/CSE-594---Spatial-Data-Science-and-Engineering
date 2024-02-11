# Spatial Data Science & Engineering Project: Trajectory Analysis and Visualization

## Description:

This repository contains the code and resources for our Spatial Data Science & Engineering project, divided into two phases:
## Phase 1: Apache Sedona for Trajectory Queries

* Setup: Instructions for setting up the working environment with Java, Hadoop, Spark, and necessary tools are provided, building upon the foundation established in Assignment-1/Assignment-3.
* Trajectory Data Fundamentals: Understanding of trajectory data, trajectory queries, and compatible databases and tools is addressed.
* Apache Sedona DataFrame Storage: Efficient storage of trajectory data within an Apache Sedona DataFrame to support various trajectory queries is implemented.
* Query Functions: The following functions are completed in ManageTrajectory.scala:
    * loadTrajectoryData(): Loads JSON trajectory data and restructures it for query optimization.
    * getSpatialRange(): Returns trajectories within a specified spatial range (latitude, longitude).
    * getSpatioTemporalRange(): Returns trajectories within a specified spatiotemporal range (latitude, longitude, timestamp).
    * getKNNTrajectory(): Identifies the K nearest neighbor trajectories based on minimum pairwise distances.

## Phase 2: Visualization with pydeck

* Front-End Interface: A user-friendly interface designed with any language, allowing interaction with Phase 1 functionality and visualization:
    * Trips layer from pydeck to visualize trajectory movements.
    * Options to:
        * Load trajectory datasets (local file browsing).
        * Provide spatial range query inputs (latitude, longitude).
        * Provide spatiotemporal range query inputs (latitude, longitude, timestamp).
        * Provide KNN query inputs (trajectory ID, K value).
* API Communication: A robust API facilitates seamless communication between the front-end interface and the running Phase 1 project:
    * Sends user inputs from the interface to Phase 1 for query execution.
    * Receives query results from Phase 1 and transmits them back to the interface for visualization.
  
* Visualization Library: Either Deck.gl or pydeck can be used for trajectory visualization.

* Optional: Enhancements to improve input flexibility can be explored, such as:
    * Rectangular tool for selecting spatial ranges.
    * Horizontal bar for selecting temporal ranges.

 
## Project Structure:

* src/main/scala/: Scala code for Phase 1, including ManageTrajectory.scala.
* data/: Sample trajectory datasets (e.g., simulated_trajectories.json).
  
## Running the Project:

### Phase 1:

 1. Follow the setup instructions.
 2. Build the Phase 1 project: sbt clean assembly.
 3. Execute the jar file: SPARK_HOME/bin/spark-submit SDSE-Phase-1-assembly-0.1.jar Path_to_output_folder [query commands].

### Phase 2:

1. Follow the setup instructions and implement Phase 2 components.
2. Run the front-end interface and interact with the Phase 1 project via the API.

### Dependencies:

* Java, Hadoop, Spark
* Apache Sedona
* pydeck
