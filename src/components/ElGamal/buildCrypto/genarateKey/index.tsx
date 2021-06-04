import { Divider } from "@material-ui/core";
import React from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import { TableConvert, TableData } from "../../../common/table";
import "./style.scss";
interface Props {
  x: number;
  p: number;
  q: number;
  e: number;
}

const GenarateKeyElGamal = (props: Props) => {
  const { x, p, q, e } = props;
  const getN = () => {};
  return (
    <div className="genarate-key-rsa">
      <h4> Sinh khóa</h4>
      <Divider />
      <div className="item">
        <div className="label">
          <TemplateKatex element={"$\\beta = \\alpha^{a} \\mod{p} = 1185  $"} />
        </div>
      </div>

      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={"$(p,α,β) =  (2357,2,1185) $"} />
        </div>
      </div>

      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={"$  (a) = (1751) $"} />
        </div>
      </div>
    </div>
  );
};

export default GenarateKeyElGamal;
