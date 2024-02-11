import React, { useState, useRef } from "react";
import { globalStore } from "../App";
import * as allTrajData from "./ImportAllTrajectoryData";

const caseWiseTraj = (vehicleId) => {
  // console.log("Case wise trajectory: ", vehicleId);
  switch (vehicleId) {
    case "0":
      return allTrajData["dat0"];
    // case "1":
    //   return allTrajData["dat1"];
    // case "2":
    //   return allTrajData["dat2"];
    // case "3":
    //   return allTrajData["dat3"];
    // case "4":
    //   return allTrajData["dat4"];
    // case "5":
    //   return allTrajData["dat5"];
    // case "6":
    //   return allTrajData["dat6"];
    // case "7":
    //   return allTrajData["dat7"];
    // case "8":
    //   return allTrajData["dat8"];
    // case "9":
    //   return allTrajData["dat9"];
    // case "10":
    //   return allTrajData["dat10"];
    // case "11":
    //   return allTrajData["dat11"];
    // case "12":
    //   return allTrajData["dat12"];
    // case "13":
    //   return allTrajData["dat13"];
    // case "14":
    //   return allTrajData["dat14"];
    // case "15":
    //   return allTrajData["dat15"];
    // case "16":
    //   return allTrajData["dat16"];
    // case "17":
    //   return allTrajData["dat17"];
    // case "18":
    //   return allTrajData["dat18"];
    // case "19":
    //   return allTrajData["dat19"];
    // case "20":
    //   return allTrajData["dat20"];
    // case "21":
    //   return allTrajData["dat21"];
    // case "22":
    //   return allTrajData["dat22"];
    // case "23":
    //   return allTrajData["dat23"];
    // case "24":
    //   return allTrajData["dat24"];
    default:
      return allTrajData["dat0"];
  }
};

export default caseWiseTraj;
