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
  e?: any;
  s?: any;
  n?: any;
}

const CheckSignRSA = () => {
  const [rsaType, setstate] = useState({
    x: "",
    e: "",
    s: "",
    n: "",
  } as RSAType);
  const getValue = (label: "x" | "e" | "s" | "n") => {
    return rsaType[label];
  };
  const [decode, setDecode] = useState("");
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
      rsaType.e &&
      rsaType.e != "" &&
      rsaType.n &&
      rsaType.n != "" &&
      rsaType.s &&
      rsaType.s != ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const demo = () => {
    setstate({
      x: "123",
      e: "17",
      s: "2746",
      n: "3233",
    });
    setIsValid(true);
  };
  useEffect(() => {
    const { x, e, s, n } = rsaType;
    if (x > 0 && e > 0 && n > 0) {
      setDecode(bigInt(s).modPow(e, n).toString());
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
      label: "e",
      onChange: setValue("e"),
      placeholder: "Nhập số khóa công khai",
      type: "number",
    },
    {
      label: "s",
      onChange: setValue("s"),
      placeholder: "Nhập chữ ký",
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
            <div className="btn-options">
              <Button variant="outlined" onClick={reNew}>
                Tạo mới
              </Button>
            </div>
            <div className="btn-options" onClick={start}>
              <Button variant="outlined" color="primary">
                Kiểm tra
              </Button>
            </div>
            <div className="btn-options" onClick={demo}>
              <Button variant="outlined" color="primary">
                Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {IsValid && (
        <div className="input box">
          <div className="encode-rsa">
            <h4>Kiểm tra chữ ký</h4> <Divider />
            <div className="item">
              <div className="label text-bold">
                <TemplateKatex
                  element={`$s^e \\pmod{n}= 2746^{17} \\pmod{3233} =  ${decode} $`}
                />
              </div>
            </div>
            <div className="item">
              <div className="label">
                <TemplateKatex element={"$\\iff$"} />
                {decode === rsaType.x ? "Chữ ký hợp lệ" : "Chữ ký không hợp lệ"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckSignRSA;
