import React, { useState } from "react";
import InputContainer from "../../form-input/inputContainer";
import DeCodeRSA from "./decode";
import DecodeRSA from "./decode";
import EncodeRSA from "./encode";
import GenarateKeyRSA from "./genarateKey";
import InputRSA, { InputItem, RSAProps } from "./input";
import "./style.scss";
export interface RSAType {
  x: number;
  e: number;
  p: number;
  q: number;
}

const BuildCriptoRSA = () => {
  const [rsaType, setstate] = useState({} as RSAType);
  const inputValues = [
    {
      label: "x",
      onChange: () => {},
      placeholder: "Nhập bản rõ x",
      type: "number",
    },
    {
      label: "p",
      onChange: () => {},
      placeholder: "Nhập số nguyên tố p",
      type: "number",
    },

    {
      label: "q",
      onChange: () => {},
      placeholder: "Nhập số nguyên tố q",
      type: "number",
    },
    {
      label: "e",
      onChange: () => {},
      placeholder: "Nhập số e",
      type: "number",
    },
  ] as InputItem[];
  return (
    <div className="rsa">
      <div className="input box">
        <InputRSA inputValues={inputValues} />
      </div>
      <div className="input box">
        <GenarateKeyRSA {...rsaType} />
      </div>
      <div className="input box">
        <EncodeRSA />
      </div>
      <div className="input box">
        <DeCodeRSA />
      </div>
    </div>
  );
};

export default BuildCriptoRSA;
