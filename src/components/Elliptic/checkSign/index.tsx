import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";
import { multiplyPoint, plusPoint, Point } from "../../../utils/elliptic";
import { hashCodeSHA } from "../../../utils/sha512";

import InputContainer from "../../form-input/inputContainer";
import { InputItem } from "../input";

import "./style.scss";
export interface ElippticType {
  x?: any;
  s?: any;
  r?: any;
  xG?: any;
  yG?: any;
  d?: any;
}
interface Props {
  points?: Point[];
  a?: any;
  p?: any;
}

const CheckSignElliptic = (props: any) => {
  const { points, a, p } = props;
  const [elippticType, setstate] = useState({} as ElippticType);
  const getValue = (label: "x" | "s" | "r" | "xG" | "yG" | "d") => {
    return elippticType[label];
  };
  const [P, setP] = useState<Point>();
  const [G, setG] = useState<Point>();
  const [z, setZ] = useState<any>();
  const [Q, setQ] = useState<Point>();
  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...elippticType, [label]: value });
    setIsValid(false);
  };

  const demo = () => {
    setstate({ x: "1", s: "34", r: "19", xG: "3", yG: "16", d: "2" });
    setIsValid(true);
  };
  useEffect(() => {
    demo();
  }, []);
  useEffect(() => {
    //P = s^-1xZxG + s^-1xrxQ

    const { d, xG, yG, s, r, x } = elippticType;
    if (d && G && Q && a > 0 && p > 0 && s && r && z) {
      try {
        let s_1 = Number(bigInt(s).modInv(p).toString());

        let p_1_1 = bigInt(s_1).multiply(z).mod(p).toString();

        let p_1 = multiplyPoint(G, Number(p_1_1), p, a);

        let p_2_1 = bigInt(s_1).multiply(r).mod(p).toString();
        let p_2 = multiplyPoint(Q, Number(p_2_1), p, a);

        let P_point = plusPoint(p_1, p_2, a, p);
        setP(P_point);
      } catch (e) {
        console.log(e);
      }
    }
  }, [Q, elippticType, a, p, z]);
  useEffect(() => {
    const { d, xG, yG } = elippticType;
    if (d && xG && yG) {
      let G_point = { x: xG, y: yG };
      setG(G_point);
      setQ(multiplyPoint(G_point, d, p, a));
    }
  }, [elippticType]);

  useEffect(() => {
    try {
      setZ(hashCodeSHA(elippticType.x).toString());
    } catch (e) {
      console.log(e);
    }
  }, [elippticType.x]);
  const inputValues = [
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x (0 < x < p) ",
      type: "number",
    },

    {
      label: "s",
      onChange: setValue("s"),
      placeholder: "Nhập chữ ký s",
      type: "number",
    },
    {
      label: "r",
      onChange: setValue("r"),
      placeholder: "Nhập chữ ký r",
      type: "number",
    },
    {
      label: "d",
      onChange: setValue("d"),
      placeholder: "Nhập khóa bí mật d ",
      type: "number",
    },
    {
      label: "xG",
      onChange: setValue("xG"),
      placeholder: "Nhập xG",
      type: "number",
    },
    {
      label: "yG",
      onChange: setValue("yG"),
      placeholder: "Nhập yG",
      type: "number",
    },
  ] as InputItem[];
  const start = () => {
    if (
      elippticType.x &&
      elippticType.x != "" &&
      elippticType.xG &&
      elippticType.xG != "" &&
      elippticType.yG &&
      elippticType.yG != "" &&
      elippticType.s &&
      elippticType.s != "" &&
      elippticType.r &&
      elippticType.r != "" &&
      elippticType.d &&
      elippticType.d != ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const reNew = () => {
    setstate({} as ElippticType);
    setIsValid(false);
  };
  const checkResult = () =>
    elippticType?.r &&
    P?.x &&
    p &&
    Number(bigInt(P?.x).mod(p)) === Number(bigInt(elippticType?.r).mod(p));
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
      {true && (
        <>
          <div className="input box">
            <div className="encode-ElGamal">
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex element={`$Q = d*G = ( ${Q?.x},${Q?.y}) $`} />
                </div>
              </div>
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$P= s^{-1}*z*G + s^{-1}*r*Q =  ( ${P?.x},${P?.y}) $`}
                  />
                </div>
              </div>
              <div className="item">
                <div className="label result">
                  <TemplateKatex element={"$\\iff$"} />
                  {checkResult() ? "Chữ ký hợp lệ" : "Chữ ký không hợp lệ"}
                </div>
                <div className="vale"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckSignElliptic;
