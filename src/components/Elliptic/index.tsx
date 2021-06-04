import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getPoints, getPowY, getQ } from "../../utils/elliptic";
import InputContainer from "../form-input/inputContainer";
import ChartElliptic from "./chartElliptic";
import DotList from "./dotList";
import InputElliptic, { InputItem } from "./input";

import "./style.scss";
export interface EllipticType {
  a?: any;
  b?: any;
  r?: any;
}
//y^2 = x3 + ax + b
const rand = () => Math.round(Math.random() * 100);
/**(3,16)	(3,27)	(9,6)	(9,37)	(10,15)	(10,28)	(11,1)	(11,42)	(12,12)	(12,31)	(13,12)	(13,31)	(15,13)	(15,30)	(17,9)	(17,34)	(18,12)	(18,31)	(19,10)	(19,33)	(20,16)
(21,4)	(21,39)	(22,17)	(22,26)	(23,7)	(23,36)	(26,3)	(26,40)	(27,20)	(27,23)	(29,13)	(29,30)	(34,21)	(34,22)	(35,19)	(35,24)	(40,7)	(40,36)	(42,13)	(42,30) */
// const dataDots = [
//   { x: 3, y: 16 },
//   { x: 3, y: 27 },
//   { x: 9, y: 6 },
//   { x: 9, y: 37 },
//   { x: 10, y: 15 },
//   { x: 10, y: 28 },
//   { x: 11, y: 1 },
//   { x: 11, y: 42 },
//   { x: 12, y: 12 },
//   { x: 12, y: 31 },
//   { x: 13, y: 31 },
//   { x: 15, y: 13 },
//   { x: 13, y: 30 },
//   { x: 17, y: 9 },
//   { x: 17, y: 34 },
//   { x: 18, y: 12 },
//   { x: 18, y: 31 },
//   { x: 19, y: 10 },
//   { x: 19, y: 33 },
//   { x: 21, y: 4 },
//   { x: 21, y: 39 },
//   { x: 22, y: 17 },
//   { x: 22, y: 26 },
//   { x: 23, y: 7 },
//   { x: 23, y: 36 },
//   { x: 26, y: 3 },
//   { x: 26, y: 40 },
//   { x: 27, y: 20 },
//   { x: 29, y: 13 },
//   { x: 29, y: 30 },
//   { x: 34, y: 21 },
//   { x: 34, y: 22 },
//   { x: 35, y: 19 },
//   { x: 35, y: 24 },
//   { x: 40, y: 7 },
//   { x: 42, y: 13 },
//   { x: 42, y: 30 },
// ];

const EllipticBuild = () => {
  const [ellipticType, setstate] = useState({
    a: "",
    b: "",
    r: "",
  } as EllipticType);
  const [dataDots, setDataDots] = useState([]);
  const [Q, setQ] = useState([]);
  const [powY, setPowY] = useState([]);
  useEffect(() => {
    const { a, b, r } = ellipticType;
    let q = getQ(ellipticType.r);
    console.log(q);

    setQ(q as any);
  }, [ellipticType]);
  const reNew = () => {
    setstate({} as EllipticType);
    setIsValid(false);
  };
  useEffect(() => {
    const { a, b, r } = ellipticType;
    let powY = getPowY(r, a, b, Q);

    setPowY(powY as any);
  }, [ellipticType, Q]);
  useEffect(() => {
    const { a, b, r } = ellipticType;
    let dataDots = getPoints(powY as any);

    setDataDots(dataDots as any);
  }, [powY]);

  const demo = () => {
    setstate({
      a: "1",
      b: "1",
      r: "23",
    });
  };
  const [IsValid, setIsValid] = useState(false);
  const getValue = (label: "a" | "b" | "r") => {
    return ellipticType[label];
  };

  const setValue = (label?: any) => (value: any) => {
    setstate({ ...ellipticType, [label]: value });
    setIsValid(false);
  };
  useEffect(() => {
    demo();
  }, []);
  const inputValues = [
    {
      label: "a",
      onChange: setValue("a"),
      placeholder: "Nhập số ",
      type: "number",
    },
    {
      label: "b",
      onChange: setValue("b"),
      placeholder: "Nhập số b",
      type: "number",
    },

    {
      label: "r",
      onChange: setValue("r"),
      placeholder: "Nhập số nguyên tố r",
      type: "number",
    },
  ] as InputItem[];
  return (
    <div className="Elliptic">
      <div className="input box">
        <div className="input-Elliptic ">
          {inputValues.map((input, index) => (
            <InputContainer
              {...input}
              key={index}
              value={getValue(input.label as any)}
            />
          ))}
          <div className="footer-input text-center">
            <div className="btn-options">
              <Button variant="outlined" onClick={reNew}>
                Tạo mới
              </Button>
            </div>
            <div className="btn-options">
              <Button variant="outlined" color="primary">
                Xây dựng
              </Button>
            </div>
            <div className="btn-options">
              <Button variant="outlined" color="primary" onClick={demo}>
                Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="input box">
        <ChartElliptic data={dataDots} />
      </div>
      {dataDots && (
        <div className="input box">
          <DotList data={dataDots} a={ellipticType.a} b={ellipticType.b} />
        </div>
      )}
    </div>
  );
};

export default EllipticBuild;
