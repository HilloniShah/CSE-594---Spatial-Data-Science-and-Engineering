import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TripSection from "./Visualization/TripSection";
import styled, { css } from "styled-components";
import APIOptions from "./Options/APIOptions";
import { createStore } from "state-pool";
import RenderDeck from "./Visualization/RenderDeck";

export const globalStore = createStore();
globalStore.setState("initialTrajectoryData", null);
globalStore.setState("trajectoryData", null);
globalStore.setState("spatialRangeData", null);
globalStore.setState("spatioTemporalRangeData", null);
globalStore.setState("knnData", null);
globalStore.setState("selectedOption", 1);
globalStore.setState("selectedTrajectory", 0);

const App = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     var totalFilePath =
  //       "/Users/varsharavindra/Desktop/ASU/Coursework/SDSE-Phase-1/data/simulated_trajectories.json";

  //     // Calling loadTrajectory API
  //     console.log("Calling initial loadTrajectory API");
  //     try {
  //       const response = await fetch("loadTrajectory?path=" + totalFilePath, {
  //         method: "POST",
  //         mode: "no-cors",
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Error! status: ${response.status}`);
  //       }
  //       globalStore
  //         .getState("initialTrajectoryData")
  //         .setValue(await response.json());
  //     } catch (err) {
  //       console.log("ERROR!!! ", err);
  //     }
  //   }
  //   fetchData();
  // });

  return (
    <div className="App">
      <header className="App-header">
        <div className="rowC">
          <TripSection />
          <APIOptions />
        </div>
      </header>
    </div>
  );
};

export default App;
