import React from "react";
import Chart from "react-google-charts";

const UserComparisonMonthly = ({ data }) => {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      //   height="200px"
      data={data}
      options={{
        // legend: { position: "none" },
        legend: { position: "top", maxLines: 3 },
        chart: {
          //   title: "Monthly Users",
          subtitle: "Graph depicting monthly Users",
        },
        hAxis: {
          title: "Months",
        },
        vAxis: {
          title: "Users",
        },
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          1: { axis: "users" },
          //   1: { axis: "months" },
        },
      }}
    />
  );
};

export default UserComparisonMonthly;
