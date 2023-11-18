import { Card } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

const GeoChart = ({ mapData }) => {
  return (
    <Chart
      chartType="GeoChart"
      data={mapData ? mapData : [["Country", "Total User"]]}
      width="100%"
      // height="400px"
      options={{
        colorAxis: { minValue: 0, colors: ["#d6daff", "blue"] },
        sizeAxis: {},
      }}
      legendToggle
    />
  );
};

export default GeoChart;
