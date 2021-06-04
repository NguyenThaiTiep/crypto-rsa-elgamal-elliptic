import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";

import InputContainer from "../../form-input/inputContainer";
import EncodeRSA from "../buildCrypto/encode";
import InputRSA, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface RSAType {
  x?: any;
  d?: any;
  n?: any;
}

const SignRSA = () => {
  const [rsaType, setstate] = useState<RSAType>({
    x: "",
    d: "",
    n: "",
  } as RSAType);
  const [s, setS] = useState("");
  const getValue = (label: "x" | "d" | "n") => {
    return rsaType[label];
  };
  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...rsaType, [label]: value });
    setIsValid(false);
  };
  useEffect(() => {
    demo();
  }, []);
  const reNew = () => {
    setstate({} as RSAType);
    setIsValid(false);
  };
  const start = () => {
    if (
      rsaType.x &&
      rsaType.x != "" &&
      rsaType.d &&
      rsaType.d != "" &&
      rsaType.n &&
      rsaType.n != ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const demo = () => {
    setstate({
      x: "123",
      d: "2753",
      n: "3233",
    });
    setIsValid(true);
  };
  useEffect(() => {
    const { x, d, n } = rsaType;
    if (x > 0 && d > 0 && n > 0) {
      setS(bigInt(x).modPow(d, n).toString());
    }
  }, [rsaType]);
  const inputValues = [
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x",
      type: "number",
    },
    {
      label: "d",
      onChange: setValue("d"),
      placeholder: "Nhập khóa bí mật d",
      type: "number",
    },

    {
      label: "n",
      onChange: setValue("n"),
      placeholder: "Nhập n",
      type: "number",
    },
  ] as InputItem[];

  return (
    <div className="rsa">
      <div className="input box">
        <div className="input-rsa ">
          {inputValues.map((input, index) => (
            <InputContainer
              {...input}
              key={index}
              value={getValue(input.label as any)}
            />
          ))}
          <div className="footer-input text-center">
            <div className="btn-options" onClick={reNew}>
              <Button variant="outlined">Tạo mới</Button>
            </div>
            <div className="btn-options">
              <Button variant="outlined" color="primary" onClick={start}>
                Tạo chữ ký
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
      {IsValid && (
        <div className="input box">
          <div className="encode-rsa">
            <h4>Ký văn bản x = {rsaType.x}</h4> <Divider />
            <div className="item">
              <div className="label text-bold">
                <TemplateKatex element={"$s = e^{-1} \\pmod{\\phi(n)} : $"} />
              </div>
              <div className="value">{s}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignRSA;
