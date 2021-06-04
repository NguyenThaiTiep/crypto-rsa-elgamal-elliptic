import React, { useState } from "react";
import InputContainer from "../../form-input/inputContainer";
import DeCodeElGamal from "./decode";
import DecodeElGamal from "./decode";
import EncodeElGamal from "./encode";
import GenarateKeyElGamal from "./genarateKey";
import InputElGamal, { InputItem, ElGamalProps } from "./input";
import "./style.scss";
export interface ElGamalType {
  x: number;
  e: number;
  p: number;
  q: number;
}

const BuildCriptoElGamal = () => {
  const [ElGamalType, setstate] = useState({} as ElGamalType);
  const inputValues = [
    {
      label: "p",
      onChange: () => {},
      placeholder: "Nhập số nguyên tố p",
      type: "number",
    },
    {
      label: "x",
      onChange: () => {},
      placeholder: "Nhập bản rõ x ( 0 < x < p - 1) ",
      type: "number",
    },
    {
      label: "a",
      onChange: () => {},
      placeholder: "Nhập số a",
      type: "number",
    },
    {
      label: "k",
      onChange: () => {},
      placeholder: "Nhập số k",
      type: "number",
    },
    {
      label: "α",
      onChange: () => {},
      placeholder: "Nhập số α",
      type: "number",
    },
  ] as InputItem[];
  return (
    <div className="ElGamal">
      <div className="input box">
        <InputElGamal inputValues={inputValues} />
      </div>
      <div className="input box">
        <GenarateKeyElGamal {...ElGamalType} />
      </div>
      <div className="input box">
        <EncodeElGamal />
      </div>
      <div className="input box">
        <DeCodeElGamal />
      </div>
    </div>
  );
};

export default BuildCriptoElGamal;
