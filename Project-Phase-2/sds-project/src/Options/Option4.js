import React, { useState, useRef } from "react";
import { Button } from "../constants";
import { globalStore } from "../App";

const Option4 = () => {
  const [spatioTemporalRangeData] = globalStore.useState(
    "spatioTemporalRangeData"
  );
  const [selectedOption] = globalStore.useState("selectedOption");

  const [latMin, setLatMin] = useState("");
  const [latMax, setLatMax] = useState("");
  const [longMin, setLongMin] = useState("");
  const [longMax, setLongMax] = useState("");
  const [timestampMin, setTimestampMin] = useState("");
  const [timestampMax, setTimestampMax] = useState("");

  const changeLatMin = (event) => {
    setLatMin(event.target.value);
  };

  const changeLatMax = (event) => {
    setLatMax(event.target.value);
  };

  const changeLongMin = (event) => {
    setLongMin(event.target.value);
  };

  const changeLongMax = (event) => {
    setLongMax(event.target.value);
  };

  const changeTimestampMin = (event) => {
    setTimestampMin(event.target.value);
  };

  const changeTimestampMax = (event) => {
    setTimestampMax(event.target.value);
  };

  const getSpatioTemporalRangeData = async () => {
    // var timestampMin = 1664511371;
    // var timestampMax = 1664512676;
    // var latMin = 33.41415667570768;
    // var longMin = -111.92254858414022;
    // var latMax = 33.414291502635706;
    // var longMax = -111.92518396810091;
    console.log(timestampMin, timestampMax, latMin, longMin, latMax, longMax);

    // Calling spatioTemporalRangeData API
    console.log("Calling spatioTemporalRangeData API");
    try {
      const response = await fetch(
        "spatioTemporalRange?timeMin=" +
          timestampMin +
          "&timeMax=" +
          timestampMax +
          "&latMin=" +
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
      globalStore
        .getState("spatioTemporalRangeData")
        .setValue(await response.json());
      globalStore.getState("selectedOption").setValue(4);
      console.log("SpatioTemporalRange API fetch complete");
    } catch (err) {
      console.log("ERROR!!! ", err);
    }
  };

  return (
    <div>
      <input
        id="latmin"
        name="latmin"
        placeholder="Minimum Latitude"
        onChange={changeLatMin}
        value={latMin}
      />
      <input
        id="latmax"
        name="latmax"
        placeholder="Maximum Latitude"
        onChange={changeLatMax}
        value={latMax}
      />
      <br></br>
      <input
        id="longmin"
        name="longmin"
        placeholder="Minimum Longitude"
        onChange={changeLongMin}
        value={longMin}
      />
      <input
        id="longmax"
        name="longmax"
        placeholder="Maximum Longitude"
        onChange={changeLongMax}
        value={longMax}
      />
      <br></br>
      <input
        id="timestampmin"
        name="timestampmin"
        placeholder="Minimum Timestamp"
        onChange={changeTimestampMin}
        value={timestampMin}
      />
      <input
        id="timestampmax"
        name="timestampmax"
        placeholder="Maximum Timestamp"
        onChange={changeTimestampMax}
        value={timestampMax}
      />
      <Button onClick={getSpatioTemporalRangeData}>
        Get Spatiotemporal Range
      </Button>
    </div>
  );
};

export default Option4;
