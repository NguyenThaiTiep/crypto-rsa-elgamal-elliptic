import React, { useState } from "react";
import ChartElliptic from "./chartElliptic";
import DotList from "./dotList";
import InputElliptic, { InputItem } from "./input";

import "./style.scss";
export interface EllipticType {
  x: number;
  e: number;
  p: number;
  q: number;
}
const rand = () => Math.round(Math.random() * 100);
const dataDots = [
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
  { x: rand(), y: rand() },
];
const data = {
  datasets: [
    {
      label: "A dataset",
      data: dataDots,
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

const EllipticBuild = () => {
  const [EllipticType, setstate] = useState({} as EllipticType);
  const inputValues = [
    {
      label: "a",
      onChange: () => {},
      placeholder: "Nhập số ",
      type: "number",
    },
    {
      label: "b",
      onChange: () => {},
      placeholder: "Nhập số b",
      type: "number",
    },

    {
      label: "r",
      onChange: () => {},
      placeholder: "Nhập số nguyên tố r",
      type: "number",
    },
  ] as InputItem[];
  return (
    <div className="Elliptic">
      <div className="input box">
        <InputElliptic inputValues={inputValues} />
      </div>
      <div className="input box">
        <ChartElliptic data={data} />
      </div>
      <div className="input box">
        <DotList data={dataDots} />
      </div>
    </div>
  );
};

export default EllipticBuild;
