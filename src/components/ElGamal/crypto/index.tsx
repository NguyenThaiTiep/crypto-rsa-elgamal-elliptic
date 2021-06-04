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

const CriptoElGamal = () => {
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
      label: "β",
      onChange: () => {},
      placeholder: "Nhập số β",
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
                Mã hóa
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
          <h4> Mã hóa</h4>
          <Divider />
          <div className="item">
            <div className="label">
              <TemplateKatex
                element={
                  "$γ = α^k \\pmod{p} = 7^{7531594862} \\pmod {1000000000000000009} = 686302616401160781  $"
                }
              />
            </div>
          </div>

          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={
                  "$δ = x * β^{k} \\pmod p = 134542481841787419 * 609914260072147340 ^ {7531594862} \\pmod {1000000000000000009} = 75000490998569333$"
                }
              />
            </div>
          </div>

          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={
                  "$ \\implies (γ,δ) = (686302616401160781 , 75000490998569333)  $"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriptoElGamal;
