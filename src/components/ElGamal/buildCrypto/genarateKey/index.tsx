import { Divider } from "@material-ui/core";
import React from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import { TableConvert, TableData } from "../../../common/table";
import "./style.scss";
interface Props {
  α?: any;
  a?: any;
  k?: any;
  e?: any;
  x?: any;
  p?: any;
  beta?: any;
}

const GenarateKeyElGamal = (props: Props) => {
  const { x, a, k, e, α, p, beta } = props;
  const getN = () => {};
  return (
    <div className="genarate-key-rsa">
      <h4> Sinh khóa</h4>
      <Divider />
      <div className="item">
        <div className="label">
          <TemplateKatex element={`$\\beta = \\alpha^{a} \\mod{p} : $`} />
        </div>
        <div className="val">{beta}</div>
      </div>

      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$K = (p,α,β) :  $`} />
        </div>
        <div className="value">{`(${p}, ${α}, ${beta})`}</div>
      </div>

      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$K'= (a) = (${a}) $`} />
        </div>
      </div>
    </div>
  );
};

export default GenarateKeyElGamal;
