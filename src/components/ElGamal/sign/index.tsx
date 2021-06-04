import { Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";
import InputContainer from "../../form-input/inputContainer";
import InputElGamal, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface ElGamalType {
  x: number;
  e: number;
  p: number;
  q: number;
}

const SignElGamal = () => {
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
      label: "α",
      onChange: () => {},
      placeholder: "Nhập số α",
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
  ] as InputItem[];
  return (
    <div className="ElGamal">
      <div className="input box">
        <div className="input-rsa ">
          {inputValues.map((input, index) => (
            <InputContainer {...input} key={index} />
          ))}
          <div className="footer-input text-center">
            <div className="btn-options">
              <Button variant="outlined">Tạo mới</Button>
            </div>
            <div className="btn-options">
              <Button variant="outlined" color="primary">
                Ký
              </Button>
            </div>
            <div className="btn-options">
              <Button variant="outlined" color="primary">
                Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Ký trên bản rõ x = 2035</h4>
          <Divider />
          <div className="item">
            <div className="label">
              <TemplateKatex
                element={
                  "$(s1,s2) =(\\alpha^k \\pmod p, (x - a * s_{1}) * (k ^{-1}) = (2012 , 1605)  $"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignElGamal;
