import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
const DeCodeRSA = () => {
  return (
    <div className="encode-rsa">
      <h4>Giải mã</h4> <Divider />
      <div className="item">
        <div className="label text-bold">
          <h6>
            <TemplateKatex element={"$x = y^{d} \\pmod{n} =  $"} /> 123456789
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DeCodeRSA;
