import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../containers/markdown";
import {
  getK,
  getPoints,
  getPowY,
  getQ,
  multiplyPoint,
  plusPoint,
  Point,
} from "../../utils/elliptic";
import InputContainer from "../form-input/inputContainer";
import { SelectInput } from "../form-input/selectInput";
import ChartElliptic from "./chartElliptic";
import CheckSignElliptic from "./checkSign";
import DotList from "./dotList";
import GenarateKeyElliptic from "./genarate_key";
import InputElliptic, { InputItem } from "./input";
import EllipticSign from "./sign";

import "./style.scss";
export interface EllipticType {
  a?: any;
  b?: any;
  p?: any;
}
export interface EncodeProp {
  s?: any;
  P?: { x: any; y: any };
  k?: any;
  M?: { x: any; y: any };
}

const EllipticBuild = () => {
  const [ellipticType, setstate] = useState({
    a: "",
    b: "",
    p: "",
  } as EllipticType);
  const [encodeType, setEncodeType] = useState({} as EncodeProp);
  const [dataDots, setDataDots] = useState([]);
  const [Q, setQ] = useState([]);
  const [M1, setM1] = useState<Point>();
  const [M2, setM2] = useState<Point>({} as Point);
  const [MDecode, setMDecode] = useState<Point>();
  const [powY, setPowY] = useState([]);
  const [B, setB] = useState<Point>();

  useEffect(() => {
    const { a, b, p } = ellipticType;
    let q = getQ(ellipticType.p);

    setQ(q as any);
  }, [ellipticType]);
  const reNew = () => {
    setstate({} as EllipticType);
    setEncodeType({});
    setIsValid(false);
  };

  useEffect(() => {
    const { a, b, p } = ellipticType;

    setPowY(getPowY(p, a, b, Q) as any);
  }, [ellipticType, Q]);
  useEffect(() => {
    const { a, b, p } = ellipticType;

    setDataDots(getPoints(powY as any) as any);
  }, [powY]);

  const demo = () => {
    setstate({
      a: "4",
      b: "2",
      p: "43",
    });
    setEncodeType({
      P: { x: "12", y: "12" },
      s: "10",
      k: 14,
      M: { x: "18", y: "12" },
    });
  };
  const [IsValid, setIsValid] = useState(false);
  const getValue = (label: "a" | "b" | "p") => {
    return ellipticType[label];
  };
  useEffect(() => {
    const { P, s, k } = encodeType;
    const { p, a } = ellipticType;
    if (P && s && s > 0 && p > 0 && a > 0) {
      try {
        let kPoint = multiplyPoint(P, s, p, a);
        setB(kPoint);
      } catch (e) {
        console.log(e);
      }
    }
    if (P && k && k > 0 && p > 0 && a > 0) {
      try {
        let kPoint = multiplyPoint(P, k, p, a);
        console.log(kPoint);

        setM1(kPoint);
      } catch (e) {
        console.log(e);
      }
    }
  }, [encodeType, ellipticType]);

  const setValue = (label?: any) => (value: any) => {
    value = Math.min(2281, value);
    setstate({ ...ellipticType, [label]: value });
    setEncodeType({});
    setIsValid(false);
  };
  useEffect(() => {
    demo();
  }, []);
  const inputValues = [
    {
      label: "a",
      onChange: setValue("a"),
      placeholder: "Nhập số ",
      type: "number",
    },
    {
      label: "b",
      onChange: setValue("b"),
      placeholder: "Nhập số b",
      type: "number",
    },

    {
      label: "p",
      onChange: setValue("p"),
      placeholder: "Nhập số nguyên tố p (độ dài khoảng 160 bit) ",
      type: "number",
    },
  ] as InputItem[];
  const setValuePoint = (label: string, value: any) => {
    setEncodeType({ ...encodeType, [label]: value });
  };
  useEffect(() => {
    const { P, s, k, M } = encodeType;
    const { p, a } = ellipticType;
    if (M1 && P && M && s && s > 0 && p > 0 && a > 0) {
      try {
        // m = M2 - sM1
        let sM1 = multiplyPoint(M1, s, p, a);
        // console.log(sM1, s, M1);

        let SM1_ = { x: sM1.x, y: bigInt(p).minus(sM1.y).toString() };

        // console.log(M2, SM1_);

        let kPoint = plusPoint(M2, SM1_, a, p);
        setMDecode(kPoint);
      } catch (e) {
        console.log(e);
      }
    }
  }, [M2, M1, encodeType, ellipticType]);
  useEffect(() => {
    // console.log(encodeType); const { P, s, k } = encodeType;
    const { P, s, k, M } = encodeType;
    const { p, a } = ellipticType;
    if (M1 && P && M && s && s > 0 && p > 0 && a > 0 && B) {
      try {
        let kM1 = k;
        let kM = getK(M, P, p, a);
        // console.log("k", kM);

        let kM2 = Number(kM1) + kM * Number(s);
        // let kPoint = multiplyPoint(P, kM2, p, a);
        // m2 = m + kB
        let KB = multiplyPoint(B, k, p, a);
        // console.log("M", M, KB);

        let m2 = plusPoint(M, KB, a, p);

        setM2(m2);
      } catch (e) {
        console.log(e);
      }
    }
  }, [M1, encodeType, ellipticType, B]);
  return (
    <div className="Elliptic">
      <div className="input box">
        <div className="input-Elliptic ">
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
              <Button variant="outlined" color="primary">
                Xây dựng
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
      <div className="input box">
        <ChartElliptic data={dataDots} />
      </div>
      <div className="input box">
        {dataDots && (
          <DotList data={dataDots} a={ellipticType.a} b={ellipticType.b} />
        )}
      </div>
      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Thực hiện mã hóa</h4>
          <Divider />
          <div className="item">
            <div className="row">
              <div className="col-md-6 col-12">
                <SelectInput
                  data={dataDots}
                  label="Chọn điểm M để mã hóa"
                  onChange={(value) => setValuePoint("M", value)}
                  value={encodeType.M}
                  key={1}
                />
              </div>
              <div className="col-md-6 col-12">
                <SelectInput
                  data={dataDots}
                  key={2}
                  label="Chọn khóa công khai P"
                  onChange={(value) => setValuePoint("P", value)}
                  value={encodeType.P}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12">
                <InputContainer
                  placeholder="Nhập khóa bí mật s"
                  key={1}
                  type="number"
                  onChange={(value) => setValuePoint("s", value)}
                  value={encodeType.s}
                  label="s"
                />
              </div>
              <div className="col-md-6 col-12">
                <InputContainer
                  placeholder="Nhập hệ số k"
                  key={2}
                  type="number"
                  onChange={(value) => setValuePoint("k", value)}
                  value={encodeType.k}
                  label="k"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input box">
        <GenarateKeyElliptic {...{ ...encodeType, ...ellipticType, B }} />
      </div>
      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Lập mã</h4>
          <Divider />
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={`$M_1 = kP\\pmod{p} = ${encodeType.k} * (${encodeType?.P?.x}, ${encodeType?.P?.y}) = (${M1?.x}, ${M1?.y})$`}
              />
            </div>
          </div>
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={`$M_2 = (M + kB)\\pmod{p} = (${M2?.x},${M2?.y})$`}
              />
            </div>
          </div>
          <Divider />
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={`$K = [M_1,M_2] = [(${M1?.x},${M1?.y}),(${M2?.x},${M2?.y})]$`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Giải mã</h4>
          <Divider />
          <div className="item">
            <div className="label text-bold">
              <TemplateKatex
                element={`$M = (M_2 - s M_1)\\pmod{p} = (${MDecode?.x} , ${MDecode?.y})   :$`}
              />
            </div>
          </div>
          <Divider />
        </div>
      </div>

      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Chữ ký số ECDSA</h4>
          <Divider />
          <EllipticSign {...{ ...ellipticType, points: dataDots }} />
        </div>
      </div>
      <div className="input box">
        <div className="genarate-key-rsa">
          <h4> Kiểm tra chữ ký</h4>
          <Divider />
          <CheckSignElliptic {...{ ...ellipticType, points: dataDots }} />
        </div>
      </div>
    </div>
  );
};

export default EllipticBuild;
