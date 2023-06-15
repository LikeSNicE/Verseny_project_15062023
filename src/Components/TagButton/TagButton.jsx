import React from "react";
import "./TagButton.scss";
import { observer } from "mobx-react-lite";

function TagButton({tag}) {

  let colorTag = {
    color: tag.color,
    border: "2px solid " + tag.color,
  };
  
  return (
    <input
      label={tag.name}
      type="radio"
      name="name"
      style={colorTag}
      data={tag.color}
      className={"tagButton"}
      value={tag.value}
    />
  );
}

export default observer(TagButton);
