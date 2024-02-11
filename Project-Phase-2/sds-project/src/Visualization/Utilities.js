import React from "react";

const interchangeCoords = (dataJson) => {
  var mainJSON = [];
  for (var dat in dataJson) {
    var mainTrajectory = {};
    mainTrajectory["trajectory_id"] = dataJson[dat]["trajectory_id"];
    mainTrajectory["vehicle_id"] = dataJson[dat]["vehicle_id"];
    var index = 0;
    var trajLocations = [];
    var trajTimestamps = [];
    var origTime = 0;
    for (var traj in dataJson[dat]["location"]) {
      if (index == 0) {
        origTime = dataJson[dat]["timestamp"][traj];
      }
      trajLocations.push([
        dataJson[dat]["location"][traj][1],
        dataJson[dat]["location"][traj][0],
      ]);
      trajTimestamps.push(dataJson[dat]["timestamp"][traj] - origTime);
      index += 1;
    }
    mainTrajectory["locations"] = trajLocations;
    mainTrajectory["timeStamp"] = trajTimestamps;
    mainJSON.push(mainTrajectory);
  }
  console.log("Completed!", mainJSON);
  return mainJSON;
};

export default interchangeCoords;
