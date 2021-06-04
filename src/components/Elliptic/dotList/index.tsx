import { Divider } from "@material-ui/core";
import React from "react";
import { TemplateKatex } from "../../../containers/markdown";
import "./style.scss";
export interface DotProp {
  data: { x: number; y: number }[];
}
const DotList = (props: DotProp) => {
  const { data } = props;
  return (
    <div className="dot-list">
      <div className="genarate-key-rsa">
        <h4> Các điểm trên E43(4,2) là điểm vô cực O và các điểm sau</h4>
        <Divider />
        {data.map((i) => (
          <DotItem {...i} />
        ))}
      </div>
    </div>
  );
};
const DotItem = (props: { x: number; y: number }) => {
  const { x, y } = props;
  return (
    <div className="dot">
      <TemplateKatex element={`\$(${x}, ${y})\$`} />
    </div>
  );
};

export default DotList;
