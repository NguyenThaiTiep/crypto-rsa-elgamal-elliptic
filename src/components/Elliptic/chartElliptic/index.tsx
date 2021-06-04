import React from "react";
import { Scatter } from "react-chartjs-2";
import "./style.scss";
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ChartElliptic = (props: { data: any }) => {
  const { data } = props;
  return (
    <div className="chart-dot">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ChartElliptic;
