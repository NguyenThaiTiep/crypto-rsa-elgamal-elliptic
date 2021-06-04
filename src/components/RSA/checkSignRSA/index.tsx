import { Button, Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../containers/markdown";

import InputContainer from "../../form-input/inputContainer";
import EncodeRSA from "../buildCrypto/encode";
import InputRSA, { InputItem } from "../buildCrypto/input";

import "./style.scss";
export interface RSAType {
  x?: any;
  d?: any;
  s?: any;
  n?: any;
}

const CheckSignRSA = () => {
  const [rsaType, setstate] = useState({
    x: "",
    n: "",
    d: "",
    s: "",
  } as RSAType);
  const getValue = (label: "x" | "d" | "s" | "n") => {
    return rsaType[label];
  };
  const [decode, setDecode] = useState("");

  const [IsValid, setIsValid] = useState(false);
  const setValue = (label?: any) => (value: any) => {
    setstate({ ...rsaType, [label]: value });
    setIsValid(false);
  };
  useEffect(() => {
    demo();
  }, []);
  const reNew = () => {
    setstate({} as RSAType);
    setIsValid(false);
  };
  const start = () => {
    if (
      rsaType.x &&
      rsaType.x != "" &&
      rsaType.d &&
      rsaType.d != "" &&
      rsaType.n &&
      rsaType.n != "" &&
      rsaType.s &&
      rsaType.s != ""
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const demo = () => {
    setstate({
      x: "123",
      d: "35024027659280588279410289335328959540490525310193563479849697798494905794152069079021098700277236530207868259529042272216295232448183495829096117553367149",
      s: "31711825763862161118992654921680949879172173461907529380994591041501909500662071781119806706827276493938418036359399912240974879381641160180718795492112524",
      n: "39307439113738059328665522437896708363216639290241695988596093778742957868447460580869616903022658452374663818820843300319038335535649400035174564188929741",
    });
    setIsValid(true);
  };
  useEffect(() => {
    const { x, d, s, n } = rsaType;
    if (x > 0 && d > 0 && n > 0) {
      setDecode(bigInt(s).modPow(d, n).toString());
    }
  }, [rsaType]);
  const inputValues = [
    {
      label: "x",
      onChange: setValue("x"),
      placeholder: "Nhập bản rõ x",
      type: "number",
    },
    {
      label: "d",
      onChange: setValue("d"),
      placeholder: "Nhập số khóa công khai d",
      type: "number",
    },
    {
      label: "s",
      onChange: setValue("s"),
      placeholder: "Nhập chữ ký s",
      type: "number",
    },

    {
      label: "n",
      onChange: setValue("n"),
      placeholder: "Nhập n",
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
            <div className="btn-options">
              <Button variant="outlined" onClick={reNew}>
                Tạo mới
              </Button>
            </div>
            <div className="btn-options" onClick={start}>
              <Button variant="outlined" color="primary">
                Kiểm tra
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

      {IsValid && (
        <div className="input box">
          <div className="encode-rsa">
            <h4>Kiểm tra chữ ký</h4> <Divider />
            <div className="item">
              <div className="label text-bold">
                <TemplateKatex element={`$s^{d_A} \\pmod{n} =  ${decode}  $`} />
              </div>
            </div>
            <div className="item">
              <div className="label">
                {bigInt(rsaType.x).mod(bigInt(rsaType.n)).equals(decode) ? (
                  <TemplateKatex
                    element={"$\\Harr x \\equiv s^{d_A} \\pmod{n} $"}
                  />
                ) : null}
              </div>
            </div>
            <div className="item">
              <div className="label result">
                <TemplateKatex element={"$\\Harr$"} />
                {bigInt(rsaType.x).mod(bigInt(rsaType.n)).equals(decode)
                  ? " Chữ ký hợp lệ"
                  : " Chữ ký không hợp lệ"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckSignRSA;
