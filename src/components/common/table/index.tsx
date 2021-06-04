import React, { useState } from "react";
import { RowProps } from "react-bootstrap";
import "./style.scss";

// text = \table{[item]/[]/.../}(w, h,  x- y - z - t,name)
// [] = (a,c,d,e,f)
/* tableinput : {
    type : table
}
ex : 
[1, 2, 4\col(2)]
[2, 3, 4, 5]
[3, 4, 5, 6]
*/

export interface TableData {
  width: number;
  height: number;
  name: string;
  rows?: RowData[];
  css: string;
  className?: string;
}
interface RowData {
  items?: ItemRowData[];
  className?: string;
}
interface ItemRowData {
  text: any;
  col?: number;
  row?: number;
  className?: string;
}

export const TableConvert = (props: TableData) => {
  const { width, height, name, rows, css, className } = props;
  const renderRow = (row: RowData) => {
    return <tr className={row.className}>{row.items?.map(renderItemRow)}</tr>;
  };
  const renderItemRow = (item: ItemRowData) => {
    const { text, col, row } = item;
    return (
      <td
        colSpan={col || 1}
        rowSpan={row || 1}
        key={0}
        className={item.className}
      >
        {text}
      </td>
    );
  };
  return (
    <div
      className={`table-render table-render-${width}`}
      style={{ width: width }}
    >
      <table className={"table-custom table-bordered " + className || ""}>
        <tbody>{rows?.map(renderRow)}</tbody>
      </table>
    </div>
  );
};
