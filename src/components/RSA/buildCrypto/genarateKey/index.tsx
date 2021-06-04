import { Divider } from "@material-ui/core";
import React from "react";
import { TemplateKatex } from "../../../../containers/markdown";
import { TableConvert, TableData } from "../../../common/table";
import "./style.scss";
interface Props {
  n?: any;
  m?: any;
  e?: any;
  d?: any;
}

const GenarateKeyRSA = (props: Props) => {
  const { n, m, e, d } = props;
  const getN = () => {};
  return (
    <>
      <h4> Sinh khóa</h4>
      <div className="genarate-key-rsa">
        <Divider />
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex element={"$n = p * q : $"} />
          </div>
          <div className="value">{n || ""}</div>
        </div>
        <Divider />
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex element={"$\\phi(n)  = (p - 1) * ( q - 1) : $"} />
          </div>

          <div className="value">{m}</div>
        </div>
        <Divider />
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex element={"$d = e^{-1} \\pmod{m}:  $"} />
          </div>
          <div className="value">{d || 0}</div>
        </div>
        <Divider />
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex element={"$  (n,e) : $"} />
          </div>
          <div className="value">
            ({e || 0},{n})
          </div>
        </div>

        <Divider />
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex element={"$  (d,n) : $"} />
          </div>
          <div className="value">
            ({d || 0},{n})
          </div>
        </div>
      </div>
    </>
  );
};

export default GenarateKeyRSA;
