import React from "react";
import styles from "./Avatar.module.scss";
export default function AvatarUI({ data }) {
  return (
    <div>
      {Object.values(data).length !== 0 ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img className={styles.logo} src={data.photo} alt={data.alt} />
          <div className={styles.blockAvatar}>
            <h3 className={styles.mainText}>{data.name}</h3>
            <p>{data.email}</p>
          </div>
        </div>
      ) : (
        <h3 className="null">Не определен</h3>
      )}
    </div>
  );
}
