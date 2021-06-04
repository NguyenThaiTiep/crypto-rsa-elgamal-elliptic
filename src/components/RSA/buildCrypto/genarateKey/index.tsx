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

const GenarateKeyRSA = (props: Props) => {
  const { x, p, q, e } = props;
  const getN = () => {};
  return (
    <div className="genarate-key-rsa">
      <h4> Sinh khóa</h4>
      <Divider />
      <div className="item">
        <div className="label text-bold">
          <h6>
            <TemplateKatex element={"$n = p * q : $"} />
          </h6>
        </div>
        <div className="value">
          4496995987892896389552303819722907204555980644693651782213761127345576465843523366415867337899647363407180791162952376438460120714364363321376247114655101
        </div>
      </div>
      <Divider />
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={"$\\phi(n)  = (p - 1) * ( q - 1) : $"} />
        </div>

        <div className="value">
          496995987892896389552303819722907204555980644693651782213761127345576465843388462908445973687363830155600732145279598102138557424637447711133515411557952
        </div>
      </div>
      <Divider />
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={"$  (n,e) : $"} />
        </div>
        <div className="value">
          (65537,4496995987892896389552303819722907204555980644693651782213761127345576465843523366415867337899647363407180791162952376438460120714364363321376247114655101)
        </div>
      </div>
      <Divider />
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={"$  (d,n) : $"} />
        </div>
        <div className="value">
          {" "}
          (2880638243552980504597330769729883384263311159267042975252390342662841533981892534924690944372937744385038594018508366387321341825895367385768285250966849
          ,
          4496995987892896389552303819722907204555980644693651782213761127345576465843523366415867337899647363407180791162952376438460120714364363321376247114655101)
        </div>
      </div>
    </div>
  );
};

export default GenarateKeyRSA;
