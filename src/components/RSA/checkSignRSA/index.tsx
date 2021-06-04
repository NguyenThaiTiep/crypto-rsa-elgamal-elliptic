import { Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";

import InputContainer from "../../form-input/inputContainer";
import EncodeRSA from "../buildCrypto/encode";
import InputRSA, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface RSAType {
  x: number;
  e: number;
  p: number;
  q: number;
}

const CheckSignRSA = () => {
  const [rsaType, setstate] = useState({} as RSAType);
  const inputValues = [
    {
      label: "x",
      onChange: () => {},
      placeholder: "Nhập bản rõ x",
      type: "number",
    },
    {
      label: "e",
      onChange: () => {},
      placeholder: "Nhập số khóa công khai",
      type: "number",
    },
    {
      label: "s",
      onChange: () => {},
      placeholder: "Nhập chữ ký",
      type: "number",
    },

    {
      label: "n",
      onChange: () => {},
      placeholder: "Nhập n",
      type: "number",
    },
  ] as InputItem[];
  return (
    <div className="rsa">
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
        <div className="encode-rsa">
          <h4>Kiểm tra chữ ký</h4> <Divider />
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={"$s^e \\pmod{n}= 2746^{17} \\pmod{3233} = 123 $"}
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

export default CheckSignRSA;
