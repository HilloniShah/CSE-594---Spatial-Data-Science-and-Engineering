import React, { useState, useRef } from "react";
import { Button } from "../constants";
import { globalStore } from "../App";

const Option1 = () => {
  const [selectedOption] = globalStore.useState("selectedOption");

  const handleClick = async () => {
    globalStore.getState("selectedOption").setValue(1);
  };

  return (
    <div>
      <Button onClick={handleClick}>Load TripsLayer</Button>
    </div>
  );
};

export default Option1;
