import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
const EncodeElGamal = () => {
  return (
    <div className="encode-rsa">
      <h4>Mã hóa bản rõ x = 2035</h4> <Divider />
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex
            element={"$γ = a^k \\pmod{p} = 1751^{1523} \\pmod{2357} = 2012$"}
          />
        </div>
      </div>
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex
            element={
              "$δ = x * β^{k} \\pmod{p} = 2035 * 1185^{1523} \\pmod{2357} = 202$"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EncodeElGamal;
