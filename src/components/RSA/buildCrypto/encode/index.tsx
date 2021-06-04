import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
const EncodeRSA = () => {
  return (
    <div className="encode-rsa">
      <h4>Mã hóa bản rõ x = 123456789</h4> <Divider />
      <div className="item">
        <div className="label text-bold">
          <h6>
            <TemplateKatex element={"$y = e^{-1} \\pmod{\\phi(n)} : $"} />
          </h6>
        </div>
        <div className="value">
          2880638243552980504597330769729883384263311159267042975252390342662841533981892534924690944372937744385038594018508366387321341825895367385768285250966849
        </div>
      </div>
    </div>
  );
};

export default EncodeRSA;
