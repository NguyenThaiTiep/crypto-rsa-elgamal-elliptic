import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";
import { egcd } from "../../../utils/gcd";

import InputContainer from "../../form-input/inputContainer";
import EncodeRSA from "../buildCrypto/encode";
import InputRSA, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface RSAType {
  x?: any;
  q?: any;
  p?: any;
  e?: any;
}

const SignRSA = () => {
  const [rsaType, setstate] = useState<RSAType>({
    x: "",
    q: "",
    p: "",
    e: "",
  } as RSAType);
  const [s, setS] = useState("");
  const [phiN, setPhiN] = useState("");
  const [n, setN] = useState("");
  const [dA, setDA] = useState("");
  const getValue = (label: "x" | "p" | "q") => {
    return rsaType[label];
  };
  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...rsaType, [label]: value });
    setIsValid(false);
  };
  useEffect(() => {
    const { p, q } = rsaType;
    if (p && q) {
      try {
        setPhiN(bigInt(p).minus(1).multiply(bigInt(q).minus(1)).toString());
        setN(bigInt(p).multiply(bigInt(q)).toString());
      } catch (e) {
        console.log(e);
      }
    }
  }, [rsaType]);
  useEffect(() => {
    const { e } = rsaType;
    if (e && phiN) {
      try {
        let egc = egcd(e, phiN).toString();

        setDA(egc);
      } catch (e) {
        console.log(e);
      }
    }
  }, [rsaType, phiN]);
  useEffect(() => {
    demo();
  }, []);
  useEffect(() => {
    const { e, x } = rsaType;
    if (e && n && x) {
      try {
        setS(bigInt(x).modPow(bigInt(e), bigInt(n)).toString());
      } catch (e) {
        console.log(e);
      }
    }
  }, [rsaType, n]);
  const reNew = () => {
    setstate({} as RSAType);
    setIsValid(false);
  };

  const start = () => {
    if (
      rsaType.x &&
      rsaType.x != "" &&
      rsaType.q &&
      rsaType.q != "" &&
      rsaType.p &&
      rsaType.p != "" &&
      rsaType.e &&
      rsaType.e != ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const demo = () => {
    setstate({
      x: "123",
      e: "2753",
      q: "186062864985921495060024628097672313218174457244746265290277413813402544027127",
      p: "211258915725672981641571789672009335406057206489563616119756939542322825326683",
    });
    setIsValid(true);
  };
  useEffect(() => {
    // const { x, d, n } = rsaType;
    // if (x > 0 && d > 0 && n > 0) {
    //   setS(bigInt(x).modPow(d, n).toString());
    // }
  }, [rsaType]);
  const inputValues = [
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x",
      type: "number",
    },
    {
      label: "p",
      onChange: setValue("d"),
      placeholder: "Nhập số nguyên tố p",
      type: "number",
    },

    {
      label: "q",
      onChange: setValue("n"),
      placeholder: "Nhập số nguyên tố q",
      type: "number",
    },
    {
      label: "e",
      onChange: setValue("e"),
      placeholder: "Nhập khóa ký e",
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
        <>
          <div className="box">
            <>
              <h4> Sinh khóa</h4>
              <div className="genarate-key-rsa">
                <Divider />
                <div className="item">
                  <div className="label text-bold">
                    <TemplateKatex element={"$n = p * q : $"} />
                  </div>
                  <div className="value">{n || ""}</div>
                </div>
                <Divider />
                <div className="item">
                  <div className="label text-bold">
                    <TemplateKatex
                      element={"$\\phi{(n)} = (p  -1 ) * (q - 1) : $"}
                    />
                  </div>
                  <div className="value">{phiN || ""}</div>
                </div>
                <Divider />
                <div className="item">
                  <div className="label text-bold">
                    <TemplateKatex element={` $(e) = ${rsaType.e} $`} />
                  </div>
                </div>
                <Divider />
                <div className="item">
                  <div className="label text-bold">
                    <TemplateKatex element={"$(n, d_A) : $"} />
                  </div>
                  <div className="value">{`(${n} , ${dA}) `}</div>
                </div>
              </div>
            </>
          </div>
          <div className="input box">
            <div className="encode-rsa">
              <h4>Ký văn bản x = {rsaType.x}</h4> <Divider />
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex element={"$s = x^{e} \\pmod{n} : $"} />
                </div>
                <div className="value">{s}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignRSA;
