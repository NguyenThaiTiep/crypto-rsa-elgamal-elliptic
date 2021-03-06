import React, { useEffect, useState } from "react";
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
  // const { data } = props;
  const [data, setData] = useState<any>();
  useEffect(() => {
    setData({
      datasets: [
        {
          label: "points",
          data: props.data,
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    });
  }, [props]);
  return (
    <div className="chart-dot">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ChartElliptic;
