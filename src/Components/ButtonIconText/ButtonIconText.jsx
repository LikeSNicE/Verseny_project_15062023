import React from "react";
import { Button } from "@mui/material";
import styles from './ButtonIconText.module.scss';

export const ButtonIconText = (props) => {
  const { startIcon, children, className,isFile,onClick} = props;
  return (
    <Button
      variant="contained"
      component="label"
      startIcon={startIcon}
      className={className}
      onClick={onClick}
    >
      <div className={styles.children}>{children}</div>
      {isFile ? <input type="file" hidden/> : null}
    </Button>
  );
};


