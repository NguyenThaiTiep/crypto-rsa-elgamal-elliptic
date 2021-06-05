import { Button, Divider } from "@material-ui/core";

import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";
import { multiplyPoint, Point } from "../../../utils/elliptic";
import { mod } from "../../../utils/gcd";
import { hashCodeSHA } from "../../../utils/sha512";
import InputContainer from "../../form-input/inputContainer";
import { SelectInput } from "../../form-input/selectInput";
import { InputItem } from "../input";

import "./style.scss";
export interface EllipticType {
  d?: any;
  G?: Point;
  x?: any;
  k?: any;
}
interface Props {
  points?: Point[];
  p?: any;
  a?: any;
  b?: any;
}

const EllipticSign = (props: Props) => {
  const { points, a, b, p } = props;
  const [ellipticType, setstate] = useState({} as EllipticType);
  const [Q, setQ] = useState<Point>();
  const [P, setP] = useState<Point>();
  const [h, setH] = useState<any>();
  const [s, setS] = useState<any>();

  const getValue = (label: "x" | "d" | "G" | "k") => {
    return ellipticType[label];
  };

  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...ellipticType, [label]: value });
    setIsValid(false);
  };

  const demo = () => {
    setstate({
      d: "2",
      x: "1",
      k: "2",
      G: { x: "3", y: "16" },
    });
    console.log("deádadmo");

    setIsValid(true);
  };
  const start = () => {
    if (
      ellipticType.x &&
      ellipticType.x != "" &&
      ellipticType.d &&
      ellipticType.d != "" &&
      ellipticType.G
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const reNew = () => {
    setstate({});
    setIsValid(false);
  };
  useEffect(() => {
    demo();
  }, []);
  const inputValues = [
    {
      label: "d",
      onChange: setValue("d"),
      placeholder: "Nhập khóa bí mật dA",
      type: "number",
    },
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x",
      type: "number",
    },
    {
      label: "k",
      onChange: setValue("k"),
      placeholder: "Chọn số ngẫu nhiên k",
      type: "number",
    },
  ] as InputItem[];
  const changeGPoint = (value: any) => {
    setstate({ ...ellipticType, G: value });
  };
  useEffect(() => {
    try {
      const { G, d, k } = ellipticType;
      //Q = d*g mod p
      if (G && d) {
        setQ(multiplyPoint(G, d, p, a));
      }
      if (G && k) {
        setP(multiplyPoint(G, k, p, a));
      }
    } catch (e) {
      console.log(e);
    }
  }, [ellipticType]);
  useEffect(() => {
    try {
      setH(hashCodeSHA(ellipticType.x).toString());
    } catch (e) {
      console.log(e);
    }
  }, [ellipticType.x]);
  useEffect(() => {
    try {
      const { d, k } = ellipticType;
      const r = P?.x;
      if (d && k && r != null) {
        let s1_value = bigInt(h).add(bigInt(d).multiply(r));

        let s2_value = bigInt(k).modInv(p);
        let s_value = s2_value.multiply(s1_value).mod(p);
        if (s_value.lesser(0)) {
          s_value = s_value.add(p);
        }
        setS(s_value);
      }
    } catch (e) {
      console.log(e);
    }
  }, [ellipticType, P, h, p]);

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
          <SelectInput
            label="Chọn điểm sinh G"
            data={points}
            onChange={changeGPoint}
            key={1}
            value={ellipticType.G}
          />

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
      {true && (
        <>
          <div className="box">
            <>
              <h4> Sinh khóa</h4>
              <div className="genarate-key-rsa">
                <Divider />
                <div className="item">
                  <div className="label text-bold">
                    <TemplateKatex
                      element={`$Q = d *G \\pmod{p} = ${ellipticType.d} * (${ellipticType?.G?.x}, ${ellipticType?.G?.y}) = (${Q?.x}, ${Q?.y})  $`}
                    />
                  </div>
                  <div className="value">{}</div>
                </div>
                <div className="item">
                  <div className="label text-bold">
                    <TemplateKatex element={`$KeyPulic =  [Q] $`} />
                  </div>
                  <div className="value">{}</div>
                </div>
                <div className="item">
                  <div className="label text-bold">
                    <TemplateKatex element={`$KeyPrivate =  [G,d] $`} />
                  </div>
                  <div className="value">{}</div>
                </div>
              </div>
            </>
          </div>
          <div className="input box">
            <div className="genarate-key-rsa">
              <h4> Ký trên bản rõ x = {ellipticType.x}</h4>
              <Divider />
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$P = k *G \\pmod{p} = ${ellipticType.k} * (${ellipticType?.G?.x}, ${ellipticType?.G?.y}) = (${P?.x}, ${P?.y})  $`}
                  />
                </div>
                <div className="value">{}</div>
              </div>{" "}
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex element={`$r = x_P  = ${P?.x}  $`} />
                </div>
                <div className="value">{}</div>
              </div>
              <Divider />
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex element={`$h = H(X) :   $`} />
                </div>
                <div className="value">{h}</div>
              </div>
              <Divider />
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$s = k^{-1}(h + d_A * r)\\pmod{p} = ${s} $`}
                  />
                </div>
              </div>
              <Divider />
              <div className="item">
                <div className="label text-bold">
                  <TemplateKatex
                    element={`$sign = (s, r) = ( ${s}, ${P?.x}) $`}
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

export default EllipticSign;
