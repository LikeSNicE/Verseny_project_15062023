import React from "react";
import styles from "./AvatatCustom.module.scss";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function AvatarCustom({
  data,
  active = false,
  sizeAvatar,
  fontSize,
}) {
  return (
    <Link
      to={data?.link}
      style={{ textDecoration: "none", width: "100%", overflow: "hidden" }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {active && <div className={styles.borderActive}></div>}
        <Avatar
          className="logo"
          src={data?.avatar}
          alt={data?.name}
          style={sizeAvatar}
        />
        <div className={styles.blockAvatar}>
          <h3
            style={{
              color: "#000",
              fontSize: fontSize?.name,
              wordWrap: "break-word",
              width: '180px'
            }}
            className={styles.textOverflow}
          >
            {data?.name}
          </h3>
          <p
            style={{
              color: "#444444",
              fontSize: fontSize?.description,
              wordWrap: "break-word",
              // width: "180px ",
            }}
            className={styles.textOverflow}
          >
            {data?.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
