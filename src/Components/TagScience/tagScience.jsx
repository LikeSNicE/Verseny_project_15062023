import React from "react";
import styles from './tagScience.module.scss';

const TagScience = ({ children, backgroundColor }) => {
  return (
    <span
      className={styles.blockCategory}
      style={{ backgroundColor: backgroundColor }}
    >
      {children}
    </span>
  );
};

export default TagScience;
