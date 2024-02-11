import React from "react";
import { globalStore } from "../App";
import RenderDeck from "./RenderDeck";
import RenderTrajectory from "./RenderTrajectory";
import RenderInitialTrajectory from "./RenderInitialTrajectory";
import RenderSpatialRange from "./RenderSpatialRange";
import caseWiseTraj from "./CaseWiseTrajectoryData";
import interchangeCoords from "./Utilities";
import allData from "./AllTrajectoryData/AllTrajData.json";
import RenderKNNTrajectory from "./RenderKNNTrajectory";

const TripSection = () => {
  const [selectedOption] = globalStore.useState("selectedOption");
  const [trajectoryData] = globalStore.useState("trajectoryData");
  const [spatialRangeData] = globalStore.useState("spatialRangeData");
  const [spatioTemporalRangeData] = globalStore.useState(
    "spatioTemporalRangeData"
  );
  const [knnData] = globalStore.useState("knnData");

  const [selectedTrajectory] = globalStore.useState("selectedTrajectory");

  var dataForInitialLoad = interchangeCoords(allData);

  const dataRequired = interchangeCoords(
    globalStore.getState("trajectoryData").getValue()
  );

  var dataForSpatialRange = interchangeCoords(
    globalStore.getState("spatialRangeData").getValue()
  );

  var dataForSpatioTemporalRange = interchangeCoords(
    globalStore.getState("spatioTemporalRangeData").getValue()
  );

  var dataForKNN = interchangeCoords(
    globalStore.getState("knnData").getValue()
  );

  switch (selectedOption) {
    case 1:
      return (
        <div className="tripsViz">
          <RenderInitialTrajectory dataRequired={dataForInitialLoad} />
        </div>
      );
    case 2:
      return (
        <div className="tripsViz">
          <RenderTrajectory dataRequired={dataRequired} />
        </div>
      );
    case 3:
      // console.log(
      //   "Inside trip section spatialRangeData: ",
      //   dataForSpatialRange
      // );
      return (
        <div className="tripsViz">
          <RenderSpatialRange dataForSpatialRange={dataForSpatialRange} />
        </div>
      );
    case 4:
      // console.log(
      //   "Inside trip section spatioTemporalRangeData: ",
      //   spatioTemporalRangeData
      // );
      return (
        <div className="tripsViz">
          <RenderSpatialRange
            dataForSpatialRange={dataForSpatioTemporalRange}
          />
        </div>
      );
    case 5:
      // console.log("Inside trip section knnData: ", knnData);
      return (
        <div className="tripsViz">
          <RenderKNNTrajectory dataForSpatialRange={dataForKNN} />
        </div>
      );
    default:
      return <div className="tripsViz">Hello World!</div>;
  }
};

export default TripSection;
