import { Divider } from "@material-ui/core";
import React from "react";
import { TemplateKatex } from "../../../containers/markdown";

const Decode = () => {
  return (
    <div className="genarate-key-rsa">
      <h4>Giải mã</h4>
      <Divider />
      <div className="item">
        <div className="label">
          <TemplateKatex element={`$(s)  = s $`} />
        </div>
        <div className="val">{}</div>
      </div>

      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$B = sP = (5, 11)  $`} />
        </div>
        <div className="value">{}</div>
      </div>

      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$E(a,b) = E(4,2)$`} />
        </div>
      </div>
      <div className="item">
        <div className="label text-bold">
          <TemplateKatex element={`$p = 12312415415152125)$`} />
        </div>
      </div>
    </div>
  );
};

export default Decode;
