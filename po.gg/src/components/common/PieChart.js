import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ wins, losses }) => {
  const data = {
    labels: ["Win", "Lose"],
    datasets: [
      {
        data: [wins, losses],
        backgroundColor: ["#4CAF50", "#FF5252"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
