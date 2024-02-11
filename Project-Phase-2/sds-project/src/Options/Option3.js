import React, { useState, useRef } from "react";
import { Button } from "../constants";
import { globalStore } from "../App";

const Option3 = () => {
  const [spatialRangeData] = globalStore.useState("spatialRangeData");
  const [selectedOption] = globalStore.useState("selectedOption");

  const [latMin, setLatMin] = useState("");
  const [latMax, setLatMax] = useState("");
  const [longMin, setLongMin] = useState("");
  const [longMax, setLongMax] = useState("");

  const changeLatMin = (event) => {
    setLatMin(event.target.value);

    console.log("value is:", event.target.value);
  };

  const changeLatMax = (event) => {
    setLatMax(event.target.value);

    console.log("value is:", event.target.value);
  };

  const changeLongMin = (event) => {
    setLongMin(event.target.value);

    console.log("value is:", event.target.value);
  };

  const changeLongMax = (event) => {
    setLongMax(event.target.value);

    console.log("value is:", event.target.value);
  };

  const callSpatialRange = async () => {
    // var latMin = 33.41415667570768;
    // var lonMin = -111.92254858414022;
    // var latMax = 33.414291502635706;
    // var lonMax = -111.92518396810091;
    console.log(latMin, longMin, latMax, longMax);

    // Calling spatialRange API
    console.log("Calling spatialRange API");
    try {
      const response = await fetch(
        "spatialRange?latMin=" +
          latMin +
          "&lonMin=" +
          longMin +
          "&latMax=" +
          latMax +
          "&lonMax=" +
          longMax,
        {
          method: "POST",
          mode: "no-cors",
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      globalStore.getState("spatialRangeData").setValue(await response.json());
      globalStore.getState("selectedOption").setValue(3);
      console.log("SpatialRange API fetch complete");
    } catch (err) {
      console.log("ERROR!!! ", err);
    }
  };

  return (
    <div>
      <input
        type="integer"
        id="latmin"
        name="latmin"
        placeholder="Minimum Latitude"
        onChange={changeLatMin}
        value={latMin}
      />
      <input
        type="integer"
        id="latmax"
        name="latmax"
        placeholder="Maximum Latitude"
        onChange={changeLatMax}
        value={latMax}
      />
      <br></br>
      <input
        type="integer"
        id="longmin"
        name="longmin"
        placeholder="Minimum Longitude"
        onChange={changeLongMin}
        value={longMin}
      />
      <input
        type="integer"
        id="longmax"
        name="longmax"
        placeholder="Maximum Longitude"
        onChange={changeLongMax}
        value={longMax}
      />
      <Button onClick={callSpatialRange}>Get Spatial Range</Button>
    </div>
  );
};

export default Option3;
