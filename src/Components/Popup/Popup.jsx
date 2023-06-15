import React from "react";
import styles from "./Popup.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import TooltipCustom from "../ToolTipCustom/ToolTipCustom";
import { Button } from "@mui/material";

const Popup = ({ data, setData, children }) => {
  if (!data.length) return;
  return (
    <div className={styles.popup}>
      <div className={styles.popupContainer}>
        <TooltipCustom titleText="Очистить выделение">
          <Button sx={{ color: "#4A4A4E" }} onClick={setData}>
            <CloseIcon sx={{ fontSize: "30px" }} />
          </Button>
        </TooltipCustom>
        {children}
      </div>
    </div>
  );
};

export default Popup;
