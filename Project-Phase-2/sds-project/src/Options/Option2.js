import React, { useState, useRef } from "react";
import { Button } from "../constants";
import { globalStore } from "../App";

const Option2 = () => {
  const [trajectoryData] = globalStore.useState("trajectoryData");
  const [selectedOption] = globalStore.useState("selectedOption");
  const inputRef = useRef(null);

  const handleClick1 = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    callLoadTrajectoryData(fileObj.name);
  };

  const callLoadTrajectoryData = async (filePath) => {
    var totalFilePath =
      "/Users/varsharavindra/Desktop/ASU/Coursework/SDSE-Phase-1/data/" +
      filePath;

    // Calling loadTrajectory API
    console.log("Calling loadTrajectory API");
    try {
      const response = await fetch("loadTrajectory?path=" + totalFilePath, {
        method: "POST",
        mode: "no-cors",
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      globalStore.getState("trajectoryData").setValue(await response.json());
      // console.log("What's the outpu: ", globalStore.getState("trajectoryData"));
      globalStore.getState("selectedOption").setValue(2);
      console.log("LoadTrajectory API fetch complete");
    } catch (err) {
      console.log("ERROR!!! ", err);
    }
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <Button onClick={handleClick1}>Load Trajectory Data</Button>
    </div>
  );
};

export default Option2;
