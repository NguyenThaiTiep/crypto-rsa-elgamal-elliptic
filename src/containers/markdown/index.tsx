import React from "react";

import "./index.scss";
import Latex from "react-latex-next";
interface Props {
  element: string;
}

export const TemplateKatex: React.FC<Props> = ({ element }) => {
  return (
    <span className="latex">
      <Latex
        delimiters={[
          { left: "$$", right: "$$", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
        ]}
      >
        {element}
      </Latex>
    </span>
  );
};
