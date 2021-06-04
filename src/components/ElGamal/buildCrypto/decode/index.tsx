import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
const DeCodeElGamal = () => {
  return (
    <div className="encode-rsa">
      <h4>Giải mã</h4> <Divider />
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex
            element={
              "$y ^{-a} \\pmod{p} = γ^{(p-1-a)} \\pmod{p} = γ^{(p-a-1)} \\pmod{p} = 2012^{(2357-1751-1)} \\pmod{2357} = 1842  $"
            }
          />
        </div>
      </div>
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={"$x = γ ^{-a} * δ = 2035  $"} />
        </div>
      </div>
    </div>
  );
};

export default DeCodeElGamal;
