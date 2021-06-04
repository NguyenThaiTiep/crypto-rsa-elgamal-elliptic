import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";
import { mod } from "../../../utils/gcd";
import InputContainer from "../../form-input/inputContainer";
import InputElGamal, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface ElGamalType {
  x?: any;
  p?: any;
  k?: any;
  a?: any;
  α?: any;
}

const SignElGamal = () => {
  const [elGamalType, setstate] = useState({} as ElGamalType);
  const [s1, setS1] = useState<any>();
  const [s2, setS2] = useState<any>();
  const getValue = (label: "x" | "p" | "k" | "a" | "α") => {
    return elGamalType[label];
  };
  const [ed, setED] = useState<any>();
  const [ed2, setED2] = useState<any>();
  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...elGamalType, [label]: value });
    setIsValid(false);
  };
  useEffect(() => {
    if (!(elGamalType.α && elGamalType.k && elGamalType.p)) {
      return;
    }
    try {
      const { x, a, p, k, α } = elGamalType;
      if (α > 0 && k > 0 && p > 0)
        setS1(
          bigInt(elGamalType.α).modPow(elGamalType.k, elGamalType.p).toString()
        );
      if (!(k && p)) {
        return;
      }
      setED(
        bigInt(k)
          .modInv(p - 1)
          .toString()
      );
    } catch (error) {}
  }, [elGamalType]);
  useEffect(() => {
    const { x, a, p } = elGamalType;
    if (!(x && a && s1 && p)) {
      return;
    }
    try {
      setED2(mod(x - a * s1, p - 1).toString());
    } catch (error) {}
    if (!(x && a && s1 && p)) {
      return;
    }
    try {
      setED2(mod(x - a * s1, p - 1).toString());
    } catch (error) {}
  }, [elGamalType, s1]);
  useEffect(() => {
    const { x, a, p, k } = elGamalType;
    if (!(ed2 && k && p)) {
      return;
    }
    try {
      setS2(
        bigInt(k)
          .modInv(p - 1)
          .multiply(ed2)
          .mod(p - 1)
          .toString()
      );
    } catch (error) {}
  }, [ed2, elGamalType]);

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

  const reNew = () => {
    setstate({} as ElGamalType);
    setIsValid(false);
  };
  useEffect(() => {
    demo();
  }, []);
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
      label: "α",
      onChange: setValue("α"),
      placeholder: "Nhập số α",
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
  ] as InputItem[];
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
            <div className="btn-options" onClick={start}>
              <Button variant="outlined" color="primary">
                Ký
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
      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Ký trên bản rõ x = {elGamalType.x}</h4>
          <Divider />
          <div className="item">
            <div className="label">
              <TemplateKatex
                element={`$(s1,s2) =(\\alpha^k \\pmod p, (x - a * s_{1}) * (k ^{-1}) = (${s1} , ${s2})  $`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignElGamal;
