import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import InputContainer from "../../form-input/inputContainer";
import DeCodeRSA from "./decode";

import EncodeRSA from "./encode";
import GenarateKeyRSA from "./genarateKey";
import InputRSA, { InputItem, RSAProps } from "./input";
import { BigNumber } from "bignumber.js";
import bigInt from "big-integer";
import "./style.scss";
import { validate } from "uuid";
import { gcd } from "../../../utils/gcd";
export interface RSAType {
  x?: any;
  e?: any;
  p?: any;
  q?: any;
}

const BuildCriptoRSA = () => {
  const [rsaType, setstate] = useState<RSAType>({
    x: "",
    e: "",
    p: "",
    q: "",
  } as RSAType);
  const [n, setN] = useState<any>("");
  const [m, setM] = useState("");
  const [d, setD] = useState("");
  const [y, setY] = useState("");
  const [_gcd, setGCD] = useState(1);
  const [IsValid, setIsValid] = useState(false);

  const reNew = () => {
    setstate({} as RSAType);
    setIsValid(false);
  };
  const demo = () => {
    setstate({
      x: "123456789",
      p: "60189309855228152582080418108842142489913101192853892029893420328887351871793",
      q: "74714197566136059701452833471216875182865235128709397697022189913844351225357",
      e: "65537",
    });
    setIsValid(true);
  };
  useEffect(() => {
    console.log(IsValid);
  }, [IsValid]);
  useEffect(() => {
    demo();
  }, []);

  const start = () => {
    if (
      _gcd === 1 &&
      rsaType.x &&
      rsaType.x != "" &&
      rsaType.p &&
      rsaType.p != "" &&
      rsaType.e &&
      rsaType.e != "" &&
      rsaType.q &&
      rsaType.q != ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const getValue = (label: "x" | "q" | "e" | "p") => {
    return rsaType[label];
  };
  const setValue = (label?: any) => (value: any) => {
    setIsValid(false);
    setstate({ ...rsaType, [label]: value });
  };
  const inputValues = [
    {
      label: "p",
      onChange: setValue("p"),
      placeholder: "Nhập số nguyên tố p",
      type: "number",
      validator: () => {},
    },
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x (0 < x < p)",
      type: "number",
    },

    {
      label: "q",
      onChange: setValue("q"),
      placeholder: "Nhập số nguyên tố q",
      type: "number",
      validator: () => {},
    },
    {
      label: "e",
      onChange: setValue("e"),
      placeholder: "Nhập số e sao cho gcd(Φ(n), e) ≡ 1 ",
      type: "number",
      validator: (value: any) => {
        setGCD(gcd(m, value));
        return gcd(m, value) === 1;
      },
      message: "Không đồng dư với 1",
    },
  ] as InputItem[];
  useEffect(() => {
    const { p, q, e } = rsaType;

    setN(new BigNumber(p || 0).multipliedBy(q || 0).toFixed());
    setM(
      new BigNumber(new BigNumber(p || 0).minus(1))
        .multipliedBy(new BigNumber(q || 0).minus(1))
        .toFixed()
    );
  }, [rsaType]);
  useEffect(() => {
    if (rsaType.e) {
      setD(
        bigInt(rsaType.e || 0)
          .modInv(m || 1)
          .toString()
      );
    }
  }, [m]);
  useEffect(() => {
    const { x, e } = rsaType;
    if (e && n != 0) {
      setY(bigInt(x).modPow(e, n).toString());
    }
  }, [n]);

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
            <div className="btn-options">
              <a
                href="https://asecuritysite.com/encryption/nprimes?y=256"
                target="_blank"
              >
                <Button variant="outlined" color="secondary">
                  Tạo P,Q
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {IsValid && (
        <>
          <div className="input box">
            <GenarateKeyRSA {...{ ...rsaType, m, n, d }} />
          </div>
          <div className="input box">
            <EncodeRSA {...{ ...rsaType, y }} />
          </div>
          <div className="input box">
            <DeCodeRSA {...{ ...rsaType, y, n, d }} />
          </div>
        </>
      )}
    </div>
  );
};

export default BuildCriptoRSA;
