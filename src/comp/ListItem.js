import React from "react";
import "../style/ListItem.css";
import { truncWords } from "../Helpers";

const ListItem = ({ name, tag, image }) => {
  return (
    <div
      className="li-item"
      style={{ gridTemplateRows: tag.length > 40 && "auto 25px 35px" }}
    >
      <div className="li-image" style={{ background: `url(${image})` }} />
      <div className="li-title">{truncWords(name, 9)}</div>
      <div className="li-desc">{tag}</div>
    </div>
  );
};
export default ListItem;
