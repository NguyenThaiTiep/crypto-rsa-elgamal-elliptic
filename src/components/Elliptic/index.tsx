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
  p?: any;
}

const EllipticBuild = () => {
  const [ellipticType, setstate] = useState({
    a: "",
    b: "",
    p: "",
  } as EllipticType);
  const [dataDots, setDataDots] = useState([]);
  const [Q, setQ] = useState([]);
  const [powY, setPowY] = useState([]);
  useEffect(() => {
    const { a, b, p } = ellipticType;
    let q = getQ(ellipticType.p);

    setQ(q as any);
  }, [ellipticType]);
  const reNew = () => {
    setstate({} as EllipticType);
    setIsValid(false);
  };
  useEffect(() => {
    const { a, b, p } = ellipticType;

    setPowY(getPowY(p, a, b, Q) as any);
  }, [ellipticType, Q]);
  useEffect(() => {
    const { a, b, p } = ellipticType;

    setDataDots(getPoints(powY as any) as any);
  }, [powY]);

  const demo = () => {
    setstate({
      a: "4",
      b: "2",
      p: "619",
    });
  };
  const [IsValid, setIsValid] = useState(false);
  const getValue = (label: "a" | "b" | "p") => {
    return ellipticType[label];
  };

  const setValue = (label?: any) => (value: any) => {
    value = Math.min(2281, value);
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
      label: "p",
      onChange: setValue("p"),
      placeholder: "Nhập số nguyên tố p (độ dài khoảng 160 bit) ",
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
