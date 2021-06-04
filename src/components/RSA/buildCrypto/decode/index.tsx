import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TemplateKatex } from "../../../../containers/markdown";

import bigInt from "big-integer";
import "./style.scss";
interface PropDecode {
  x?: any;
  y?: any;
  n?: any;
  d?: any;
}
const DeCodeRSA = (props: PropDecode) => {
  const [decode, setDecode] = useState("");
  useEffect(() => {
    const { x, y, n, d } = props;
    if (y && n && d) {
      try {
        setDecode(bigInt(y).modPow(d, n).toString());
      } catch (e) {
        console.log(e);
      }
    }
  }, [props]);
  return (
    <>
      <h4>Giải mã</h4>
      <div className="encode-rsa">
        <Divider />
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex element={"$x = y^{d} \\pmod{n} =  $"} /> {decode}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeCodeRSA;
