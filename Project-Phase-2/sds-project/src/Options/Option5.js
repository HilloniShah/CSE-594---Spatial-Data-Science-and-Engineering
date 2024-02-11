import React, { useState, useRef } from "react";
import { Button } from "../constants";
import { globalStore } from "../App";

const Option5 = () => {
  const [knnData] = globalStore.useState("knnData");
  const [selectedOption] = globalStore.useState("selectedOption");

  const [trajectoryId, setTrajectoryId] = useState("");
  const [k, setLatK] = useState("");

  const changeTrajectoryId = (event) => {
    setTrajectoryId(event.target.value);
  };

  const changeK = (event) => {
    setLatK(event.target.value);
  };

  const getknnData = async () => {
    // var trajectoryId = 0;
    // var neighbors = 5;
    console.log(trajectoryId, k);

    // Calling knnData API
    console.log("Calling knnData API");
    try {
      const response = await fetch(
        "knnTrajectory?trajectoryId=" + trajectoryId + "&neighbors=" + k,
        {
          method: "POST",
          mode: "no-cors",
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      globalStore.getState("knnData").setValue(await response.json());
      globalStore.getState("selectedOption").setValue(5);
      console.log("KNN API fetch complete");
    } catch (err) {
      console.log("ERROR!!! ", err);
    }
  };

  return (
    <div>
      <input
        id="trajectoryid"
        name="trajectoryid"
        placeholder="Trajectory Id"
        onChange={changeTrajectoryId}
        value={trajectoryId}
      />
      <input
        id="k"
        name="k"
        placeholder="Value of K"
        onChange={changeK}
        value={k}
      />
      <Button onClick={getknnData}>Get KNN Trajectory</Button>
    </div>
  );
};

export default Option5;
