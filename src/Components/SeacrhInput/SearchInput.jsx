import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SeacrhInput.module.scss";

export default function SearchInputCustom({ label, getValue }) {
  return (
    <div className={styles.SearchContainer}>
      <SearchIcon />
      <input
        type="text"
        placeholder={label}
        onChange={(e) => getValue(e.target.value)}
      />
    </div>
  );
}
