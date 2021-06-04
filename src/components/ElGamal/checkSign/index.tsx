import { Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";

import InputContainer from "../../form-input/inputContainer";
import EncodeElGamal from "../buildCrypto/encode";
import InputElGamal, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface ElGamalType {
  x: number;
  e: number;
  p: number;
  q: number;
}

const CheckSignElGamal = () => {
  const [ElGamalType, setstate] = useState({} as ElGamalType);
  const inputValues = [
    {
      label: "p",
      onChange: () => {},
      placeholder: "Nhập p",
      type: "number",
    },
    {
      label: "x",
      onChange: () => {},
      placeholder: "Nhập bản rõ x (0 < x < p) ",
      type: "number",
    },
    {
      label: "α",
      onChange: () => {},
      placeholder: "Nhập α",
      type: "number",
    },

    {
      label: "β",
      onChange: () => {},
      placeholder: "Nhập β",
      type: "number",
    },
    {
      label: "s1",
      onChange: () => {},
      placeholder: "Nhập chữ ký s1",
      type: "number",
    },
    {
      label: "s2",
      onChange: () => {},
      placeholder: "Nhập chữ ký s2",
      type: "number",
    },
  ] as InputItem[];
  return (
    <div className="ElGamal">
      <div className="input box">
        <div className="input-ElGamal ">
          {inputValues.map((input, index) => (
            <InputContainer {...input} key={index} />
          ))}
          <div className="footer-input text-center">
            <div className="btn-options">
              <Button variant="outlined">Tạo mới</Button>
            </div>
            <div className="btn-options">
              <Button variant="outlined" color="primary">
                Kiểm tra
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
        <div className="encode-ElGamal">
          <h4>Kiểm tra chữ ký</h4> <Divider />
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={
                  "$(\\beta ^ {s_1}) * (s_1 ^ {s_2}) \\pmod p = 1185 ^{2012} * 2012 ^{1605} \\pmod {2357} = 1230$"
                }
              />
            </div>
          </div>
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={
                  "$\\alpha ^ x \\pmod p = 2 ^{2035} \\pmod {2357} = 1230$"
                }
              />
            </div>
          </div>
          <div className="item">
            <div className="label">
              <TemplateKatex element={"$\\iff$"} />
              Chữ ký hợp lệ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckSignElGamal;
