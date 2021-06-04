import { Button } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";

import InputContainer from "../../form-input/inputContainer";
import DeCodeElGamal from "./decode";
import DecodeElGamal from "./decode";
import EncodeElGamal from "./encode";
import GenarateKeyElGamal from "./genarateKey";
import InputElGamal, { InputItem, ElGamalProps } from "./input";
import "./style.scss";
export interface ElGamalType {
  p?: any;
  x?: any;
  k?: any;
  a?: any;
  α?: any;
}

const BuildCriptoElGamal = () => {
  const [elGamalType, setstate] = useState({} as ElGamalType);
  const getValue = (label: "x" | "k" | "a" | "p" | "α") => {
    return elGamalType[label];
  };
  const [IsValid, setIsValid] = useState(false);
  const [ed, setED] = useState<any>();
  const [ed2, setED2] = useState<any>();
  const [s1, setS1] = useState<any>();
  const [s2, setS2] = useState<any>();
  const [beta, setBeta] = useState<any>();
  const [gama, setGamma] = useState<any>();
  const [delta, setDelta] = useState<any>();
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...elGamalType, [label]: value });
    setIsValid(false);
  };
  const demo = () => {
    setstate({
      p: "2357",
      x: "2035",
      k: "1523",
      a: "1751",
      α: "2",
    });
    setIsValid(true);
  };
  useEffect(() => {
    demo();
  }, []);
  const reNew = () => {
    setstate({} as ElGamalType);
    setIsValid(false);
  };
  useEffect(() => {
    const { k, p, x } = elGamalType;
    if (!(beta && k && x && p)) {
      return;
    }
    try {
      setDelta(bigInt(beta).modPow(k, p).multiply(x).mod(p).toString());
    } catch (error) {
      console.log(error);
    }
  }, [beta, elGamalType]);
  useEffect(() => {
    const { α, a, p, k } = elGamalType;
    if (α > 0 && a > 0 && p) {
      setBeta(bigInt(α).modPow(a, p).toString());
      setGamma(bigInt(α).modPow(k, p).toString());
    }
  }, [elGamalType]);
  const inputValues = [
    {
      label: "p",
      onChange: setValue("p"),
      placeholder: "Nhập số nguyên tố p",
      type: "number",
    },
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x ( 0 < x < p - 1) ",
      type: "number",
    },
    {
      label: "a",
      onChange: setValue("a"),
      placeholder: "Nhập số a",
      type: "number",
    },
    {
      label: "k",
      onChange: setValue("k"),
      placeholder: "Nhập số k",
      type: "number",
    },
    {
      label: "α",
      onChange: setValue("α"),
      placeholder: "Nhập số α",
      type: "number",
    },
  ] as InputItem[];
  const start = () => {
    if (
      elGamalType.x &&
      elGamalType.x != "" &&
      elGamalType.p &&
      elGamalType.p != "" &&
      elGamalType.a &&
      elGamalType.a != "" &&
      elGamalType.α &&
      elGamalType.α != "" &&
      elGamalType.k &&
      elGamalType.k != ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className="ElGamal">
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
            <div className="btn-options">
              <Button variant="outlined" color="primary" onClick={start}>
                Tạo hệ mật
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
      {true && (
        <>
          <div className="input box">
            <GenarateKeyElGamal {...{ ...elGamalType, beta }} />
          </div>
          <div className="input box">
            <EncodeElGamal {...{ ...elGamalType, beta, delta, gama }} />
          </div>
          <div className="input box">
            <DeCodeElGamal {...{ ...elGamalType, beta, delta, gama }} />
          </div>
        </>
      )}
    </div>
  );
};

export default BuildCriptoElGamal;
