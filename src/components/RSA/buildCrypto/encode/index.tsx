import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
interface EncodeInput {
  x?: any;
  y?: any;
}
const EncodeRSA = (props: EncodeInput) => {
  const { x, y } = props;
  return (
    <>
      <h4>Mã hóa bản rõ x = {x || 0}</h4>
      <div className="encode-rsa">
        <Divider />
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex element={"$y = e^{-1} \\pmod{\\phi(n)} : $"} />
          </div>
          <div className="value">{y}</div>
        </div>
      </div>
    </>
  );
};

export default EncodeRSA;
