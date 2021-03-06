import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";

import InputContainer from "../../form-input/inputContainer";
import EncodeElGamal from "../buildCrypto/encode";
import InputElGamal, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface ElGamalType {
  x?: any;
  p?: any;
  s1?: any;
  s2?: any;

  α?: any;
  β?: any;
}

const CheckSignElGamal = () => {
  const [elGamalType, setstate] = useState({} as ElGamalType);
  const getValue = (label: "x" | "p" | "s1" | "s2" | "α" | "β") => {
    return elGamalType[label];
  };
  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...elGamalType, [label]: value });
    setIsValid(false);
  };
  const [VT, setVT] = useState<any>();
  const [VP, setVP] = useState<any>();
  useEffect(() => {
    const { x, p, s1, s2, α, β } = elGamalType;
    if (!(β && p && s1 && s2)) {
      return;
    }
    try {
      setVT(
        bigInt(β)
          .modPow(s1, p)
          .multiply(bigInt(s1).modPow(s2, p))
          .mod(p)
          .toString()
      );
    } catch (error) {
      console.log(error);
    }
    if (!(α && p && x)) {
      return;
    }
    try {
      setVP(bigInt(α).modPow(x, p).toString());
    } catch (error) {
      console.log(error);
    }
  }, [elGamalType]);
  const demo = () => {
    setstate({
      p: "72123325254581672626176125162734766156045554514105133573263758251347324533769",
      x: "2035",
      s1: "23900119770798293279495240643205253538760682122808343466106391015625147569941",
      s2: "-70903610621877350840840231871621916947776577732417476622347443850850380822344",
      α: "2",
      β: "6143220919135760503775743288903283414314504438266328834270291138543721246536",
    });
    setIsValid(true);
  };
  useEffect(() => {
    demo();
  }, []);
  const inputValues = [
    {
      label: "p",
      onChange: setValue("p"),
      placeholder: "Nhập p",
      type: "number",
    },
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x (0 < x < p) ",
      type: "number",
    },
    {
      label: "α",
      onChange: setValue("α"),
      placeholder: "Nhập α",
      type: "number",
    },

    {
      label: "β",
      onChange: setValue("β"),
      placeholder: "Nhập β",
      type: "number",
    },
    {
      label: "s1",
      onChange: setValue("s1"),
      placeholder: "Nhập chữ ký s1",
      type: "number",
    },
    {
      label: "s2",
      onChange: setValue("s2"),
      placeholder: "Nhập chữ ký s2",
      type: "number",
    },
  ] as InputItem[];
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
      elGamalType.s1 &&
      elGamalType.s1 != "" &&
      elGamalType.s2 &&
      elGamalType.s2 != ""
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
  return (
    <div className="ElGamal">
      <div className="input box">
        <div className="input-ElGamal ">
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
                Kiểm tra
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
            <div className="encode-ElGamal">
              <h4>Kiểm tra chữ ký</h4> <Divider />
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$(\\beta ^ {s_1}) * (s_1 ^ {s_2}) \\pmod p $`}
                  />
                  <TemplateKatex element={`$= ${elGamalType.β} $`} />

                  <TemplateKatex element={`$^{${elGamalType.s1} } $`} />
                  <TemplateKatex element={`$ * ${elGamalType.s1}$`} />

                  <TemplateKatex element={`$^{${elGamalType.s2} } $`} />
                  <TemplateKatex element={`$\\pmod {${elGamalType.p} } $`} />
                  <TemplateKatex element={`$= ${VT}$`} />
                </div>
              </div>
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$\\alpha ^ {x} \\pmod p = ${elGamalType.α}^{${elGamalType.x}} \\pmod {${elGamalType.p}} = ${VP}$`}
                  />
                </div>
              </div>
              <div className="item">
                <div className="label result">
                  <TemplateKatex element={"$\\iff$"} />
                  {VT === VP ? "Chữ ký hợp lệ" : "Chữ ký không hợp lệ"}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckSignElGamal;
