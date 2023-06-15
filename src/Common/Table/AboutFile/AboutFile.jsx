import React from "react";

export default function AboutFile({ data }) {
  const getAnotherArray = [];
  data.map((value, index) =>
    index !== 0 ? getAnotherArray.push(value) : false
  );

  return (
    <div style={{ width: "220px" }}>
      <h3>{data[0]}</h3>
      <p
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {getAnotherArray.join(",")}
      </p>
    </div>
  );
}
