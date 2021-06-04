import { Divider } from "@material-ui/core";
import bigInt from "big-integer";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
interface Props {
  α?: any;
  a?: any;
  k?: any;
  e?: any;
  x?: any;
  p?: any;
  beta?: any;
  gama?: any;
  delta?: any;
}
const DeCodeElGamal = (props: Props) => {
  const { x, a, k, p, delta, beta, gama } = props;
  const [gamalValue, setgamalValue] = useState<any>("");
  const [XValue, setXValue] = useState<any>("");
  useEffect(() => {
    if (gama > 0 && p > 0 && p - a - 1 > 0) {
      setgamalValue(
        bigInt(gama)
          .modPow(bigInt(p).minus(bigInt(a)).minus(1), bigInt(p))
          .toString()
      );
    }
  }, [x, a, k, p, delta, beta, gama]);
  useEffect(() => {
    if (gamalValue && delta > 0) {
      try {
        setXValue(
          bigInt(gamalValue).multiply(bigInt(delta)).mod(bigInt(p)).toString()
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [gamalValue, props]);
  useEffect(() => {}, [props]);
  return (
    <div className="encode-rsa">
      <h4>Giải mã</h4> <Divider />
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$y ^{-a} \\pmod{p}   $`} />
          <TemplateKatex element={`$ γ^{(p-1-a)} \\pmod{p} = $`} />
          <TemplateKatex element={`$${gama} $`} />
          <TemplateKatex element={`$^{(${p}-${a}-1)}    $`} />
          <TemplateKatex element={`$= \\pmod{${p}}  $`} />
          <TemplateKatex element={`$= ${gamalValue}  $`} />
        </div>
      </div>
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$x = γ ^{-a} * δ = ${XValue}  $`} />
        </div>
      </div>
    </div>
  );
};

export default DeCodeElGamal;
