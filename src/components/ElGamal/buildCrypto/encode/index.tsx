import { Divider } from "@material-ui/core";
import React, { useState } from "react";
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

const EncodeElGamal = (props: Props) => {
  const { x, a, k, p, delta, beta, gama, α } = props;
  return (
    <div className="encode-rsa">
      <h4>Mã hóa bản rõ x = {x}</h4> <Divider />
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex
            element={`$γ = \\alpha^k \\pmod{p} = ${α}^{${k}} \\pmod{${p}} = ${gama}$`}
          />
        </div>
      </div>
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex
            element={`$δ = x * β^{k} \\pmod{p} = ${x} * ${beta}^{${k}} \\pmod{${p}} = ${delta}$`}
          />
        </div>
      </div>
    </div>
  );
};

export default EncodeElGamal;
