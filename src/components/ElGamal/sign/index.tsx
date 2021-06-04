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

  const getValue = (label: "x" | "p" | "k" | "a" | "α") => {
    return elGamalType[label];
  };
  const [beta, setBeta] = useState("");
  const [gamma, setGamma] = useState("");
  const [delta, setDelta] = useState("");
  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...elGamalType, [label]: value });
    setIsValid(false);
  };
  useEffect(() => {
    const { α, a, p, k } = elGamalType;
    if (α && a && p && k) {
      try {
        setBeta(bigInt(α).modPow(bigInt(a), bigInt(p)).toString());
        setGamma(bigInt(α).modPow(bigInt(k), bigInt(p)).toString());
      } catch (e) {
        console.log(e);
      }
    }
  }, [elGamalType]);
  useEffect(() => {
    const { α, a, p, k, x } = elGamalType;
    if (α && a && p && k) {
      try {
        setDelta(
          bigInt(x)
            .minus(bigInt(a).multiply(bigInt(gamma)))
            .multiply(bigInt(k).modInv(bigInt(p).minus(1)))
            .mod(bigInt(p).minus(1))
            .toString()
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [gamma, elGamalType]);
  const demo = () => {
    setstate({
      p: "72123325254581672626176125162734766156045554514105133573263758251347324533769",
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
      placeholder: "Nhập số nguyên tố p (độ dài khoàng 256 bits",
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
      <div className="box">
        <>
          <h4> Sinh khóa</h4>
          <div className="genarate-key-rsa">
            <Divider />
            <div className="item">
              <div className="label text-bold">
                <TemplateKatex
                  element={"$\\beta = \\alpha^{a} \\pmod{p} : $"}
                />
              </div>
              <div className="value">{beta}</div>
            </div>
            <Divider />
            <div className="item">
              <div className="label text-bold">
                <TemplateKatex element={`$ K' = (a) = (${elGamalType.a}) $`} />
              </div>
            </div>
            <Divider />
            <div className="item">
              <div className="label text-bold">
                <TemplateKatex element={`$ K'' = (p, \\alpha, \\beta) : $`} />
              </div>
              <div className="value">
                {`(${elGamalType.p} , ${elGamalType.α} , ${beta})`}
              </div>
            </div>

            <Divider />
          </div>
        </>
      </div>
      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Ký trên bản rõ x = {elGamalType.x}</h4>
          <Divider />
          <div className="item">
            <div className="label">
              <TemplateKatex
                element={`$\\gamma = \\alpha^{k} \\pmod{m} :  $`}
              />
            </div>{" "}
            <div className="value">{gamma}</div>
          </div>
          <Divider />
          <div className="item">
            <div className="label">
              <TemplateKatex
                element={`$\\delta = (x - a*\\gamma) * k ^ {-1} \\pmod{(p - 1)} :  $`}
              />
            </div>
            <div className="value">{delta}</div>
          </div>
          <Divider />
          <div className="item">
            <div className="label">
              <TemplateKatex
                element={`$(s_1, s_2) = (\\gamma, \\delta) :  $`}
              />
            </div>
            <div className="value">{`(${gamma} , ${delta})`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignElGamal;
