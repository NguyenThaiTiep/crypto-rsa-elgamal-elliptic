import { Divider } from "@material-ui/core";
import React from "react";
import { TemplateKatex } from "../../../containers/markdown";
interface Props {
  M1?: any;
  M2?: any;
  B?: any;
  P?: { x: any; y: any };
  s?: any;
  k?: any;
  a?: any;
  b?: any;
  p?: any;
}

const GenarateKeyElliptic = (props: Props) => {
  const { s, M1, M2, B, P, k, a, b, p } = props;
  return (
    <div className="genarate-key-rsa">
      <h4> Sinh khóa</h4>
      <Divider />
      <div className="item">
        <div className="label">
          <TemplateKatex element={`$(s)  = (${s}) $`} />
        </div>
      </div>
      {P && B && (
        <div className="item">
          <div className="label text-bold">
            <TemplateKatex
              element={`$B = sP = ${s} * (${P.x}, ${P?.y}) = (${B.x}, ${B.y})  $`}
            />
          </div>
        </div>
      )}
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$E(a,b) = E(${a},${b})$`} />
        </div>
      </div>{" "}
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$p = ${p}$`} />
        </div>
      </div>
    </div>
  );
};

export default GenarateKeyElliptic;
