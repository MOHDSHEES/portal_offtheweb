import React from "react";
import { Chart } from "react-google-charts";

const OperatingSystemPieChart = ({ data }) => {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        legend: { position: "bottom" },
        title: "",
        pieHole: 0.3,
        is3D: true,
      }}
    />
  );
};

export default OperatingSystemPieChart;
