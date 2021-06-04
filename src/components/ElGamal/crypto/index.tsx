import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";
import InputContainer from "../../form-input/inputContainer";
import InputElGamal, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface ElGamalType {
  p?: any;
  x?: any;
  α?: any;
  β?: any;
  k?: any;
}

const CriptoElGamal = () => {
  const [elGamalType, setstate] = useState({} as ElGamalType);

  const getValue = (label: "x" | "p" | "k" | "β" | "α") => {
    return elGamalType[label];
  };
  const [gamma, setGamma] = useState<any>();
  const [delta, setDelta] = useState<any>();
  useEffect(() => {
    const { α, k, p, β, x } = elGamalType;
    if (α > 0 && k > 0 && p > 0) setGamma(bigInt(α).modPow(k, p).toString());
    if (β > 0 && k > 0 && p > 0 && x > 0)
      setDelta(
        bigInt(β)
          .modPow(k, p)
          .multiply(bigInt(x).modPow(1, p))
          .modPow(1, p)
          .toString()
      );
  }, [elGamalType]);
  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...elGamalType, [label]: value });
    setIsValid(false);
  };
  const demo = () => {
    setstate({
      p: "72123325254581672626176125162734766156045554514105133573263758251347324533769",
      x: "2035",
      k: "1523",
      β: "6143220919135760503775743288903283414314504438266328834270291138543721246536",
      α: "2",
    });
    setIsValid(true);
  };
  useEffect(() => {
    demo();
  }, []);
  const start = () => {
    if (
      elGamalType.x &&
      elGamalType.x != "" &&
      elGamalType.p &&
      elGamalType.p != "" &&
      elGamalType.β &&
      elGamalType.β != "" &&
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
      label: "β",
      onChange: setValue("β"),
      placeholder: "Nhập số β",
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
                Mã hóa
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
          <div className="input box">
            <div className="genarate-key-rsa">
              <h4> Mã hóa</h4>
              <Divider />
              <div className="item">
                <div className="label">
                  <TemplateKatex
                    element={`$γ = α^k \\pmod{p} = ${elGamalType.α}^{${elGamalType.k}} \\pmod {${elGamalType.p}} = ${gamma}  $`}
                  />
                </div>
              </div>

              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$δ = x * β^{k} \\pmod p = ${elGamalType.x} * ${elGamalType.β} ^ {${elGamalType.k}} \\pmod {${elGamalType.p}} = ${delta}$`}
                  />
                </div>
              </div>

              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$ \\implies (γ,δ) = (${gamma} , ${delta})  $`}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CriptoElGamal;
