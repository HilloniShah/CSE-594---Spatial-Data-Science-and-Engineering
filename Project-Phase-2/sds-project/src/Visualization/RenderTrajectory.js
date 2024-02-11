import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import DeckGL from "@deck.gl/react";
import { TripsLayer } from "@deck.gl/geo-layers";
import "mapbox-gl/dist/mapbox-gl.css";
import { globalStore } from "../App";
import data from "./spatialRange.json";
// import mainJSON from "../trajectoryData.json";
import caseWiseTraj from "./CaseWiseTrajectoryData";
import * as allTrajData from "./ImportAllTrajectoryData";

// Source data CSV
const DATA_URL = {
  //"https://raw.githubusercontent.com/sujjdv/special/main/sample.json",
  TRIPS:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json", // eslint-disable-line
};
// console.log("What's here: ", DATA_URL.TRIPS);

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGlsbG9uaXNoYWgiLCJhIjoiY2xiMDJxMWZ0MHk4MjNucWxyNXV4d2NocSJ9.tracZdg1mqaxwncDvNa84A";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000],
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70],
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect],
};

var INITIAL_VIEW_STATE = {
  longitude: -111.92518396810091,
  latitude: 33.414291502635706,
  //   longitude: -74,
  //   latitude: 40.72,
  zoom: 14,
  pitch: 45,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export default function RenderTrajectory(
  props,
  {
    trips = DATA_URL.TRIPS,
    trailLength = 180,
    initialViewState = INITIAL_VIEW_STATE,
    mapStyle = MAP_STYLE,
    theme = DEFAULT_THEME,
    loopLength = 180, // unit corresponds to the timestamp in source data
    animationSpeed = 0.75,
  }
) {
  if (props.dataForSpatialRange != null) {
    INITIAL_VIEW_STATE = {
      // longitude: -111.92518396810091,
      // latitude: 33.414291502635706,
      longitude: props.dataRequired[0]["locations"][0][0],
      latitude: props.dataRequired[0]["locations"][0][1],
      //   longitude: -74,
      //   latitude: 40.72,
      zoom: 16,
      pitch: 45,
      bearing: 0,
    };
  }

  const [time, setTime] = useState(0);
  const [animation] = useState({});
  //   console.log("WEEHEEEE ", props.dataRequired);
  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  const layers = [
    // This is only needed when using shadow effects
    new TripsLayer({
      id: "trips",
      data: props.dataRequired, //"https://raw.githubusercontent.com/sujjdv/special/main/sample.json",
      getPath: (d) => d.locations,
      getTimestamps: (d) => d.timestamp,
      getColor: (d) =>
        d.vehicle_id % 2 == 0 ? theme.trailColor0 : theme.trailColor1,
      opacity: 0.9,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: time,
      shadowEnabled: false,
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      //   effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >
      <MapGL
        width={700}
        height={450}
        latitude={37.78}
        longitude={-122.45}
        zoom={11}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
      />
    </DeckGL>
  );
}

export function renderToDOM(container) {
  render(<RenderTrajectory />, container);
}
