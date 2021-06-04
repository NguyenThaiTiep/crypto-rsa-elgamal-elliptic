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

const SignRSA = () => {
  const [rsaType, setstate] = useState({} as RSAType);
  const inputValues = [
    {
      label: "x",
      onChange: () => {},
      placeholder: "Nhập bản rõ x",
      type: "number",
    },
    {
      label: "d",
      onChange: () => {},
      placeholder: "Nhập số khóa bí mật d",
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
                Tạo chữ ký
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
          <h4>Ký văn bản x = 123456789</h4> <Divider />
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex element={"$s = e^{-1} \\pmod{\\phi(n)} : $"} />
            </div>
            <div className="value">
              2880638243552980504597330769729883384263311159267042975252390342662841533981892534924690944372937744385038594018508366387321341825895367385768285250966849
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignRSA;
