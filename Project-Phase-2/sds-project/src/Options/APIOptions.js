import React, { useState, useRef } from "react";
import Option1 from "./Option1";
import Option2 from "./Option2";
import Option3 from "./Option3";
import Option4 from "./Option4";
import Option5 from "./Option5";

const APIOptions = () => {
  return (
    <div className="colC" id="optionsContainer">
      <Option1></Option1>
      <Option2></Option2>
      <Option3></Option3>
      <Option4></Option4>
      <Option5></Option5>
    </div>
  );
};

export default APIOptions;
