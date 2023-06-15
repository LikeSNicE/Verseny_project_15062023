import React from "react";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { memo } from "react";

const BootstrapButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  borderRadius: "10px",
  lineHeight: 1.5,
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "#303030",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#ADADD7",
  },
  "&:disabled": {
    background: "rgba(114, 114, 216, 0.3) !important",
  },

  //Outlined
  "&.MuiButton-outlined": {
    border: "2px solid black",
    background: "none",
    color: "black",
  },
  "&.MuiButton-outlined:hover": {
    background: "black",
    color: "#fff",
  },

  "&.MuiButton-outlinedError": {
    border: "2px solid #E8533F",
    color: "#E8533F",
  },
  "&.MuiButton-outlinedError:hover": {
    background: "#E8533F",
    color: "#fff",
  },

  "&.MuiButton-outlinedWarning": {
    border: "2px solid #F8B84A",
    color: "#F8B84A",
  },
  "&.MuiButton-outlinedWarning:hover": {
    background: "#F8B84A",
    color: "#fff",
  },

  //Contained
  "&.MuiButton-contained": {
    background: "black",
    color: "#fff",
  },
  "&.MuiButton-containedPrimary": {
    background: "#7272D8",
    color: "#fff",
  },
  "&.MuiButton-containedError": {
    background: "#E8533F",
    color: "#fff",
  },
  "&.MuiButton-containedWarning": {
    background: "#F8B84A",
    color: "#fff",
  },
  "&.MuiLoadingButton-loading": {
    color: "#fff",
    padding: "18px",
    background: "rgba(114, 114, 216, 0.4)",
  },
  ".MuiCircularProgress-root": {
    color: "#fff",
    width: "20px !important",
    height: "20px !important",
  },
});

function ButtonCustom(props) {
  const {
    children,
    variant = "contained",
    color,
    startIcon,
    endIcon,
    onClick,
    style,
    type = "button",
    loading = false,
    className,
    disabled = false,
  } = props;

  return (
    <BootstrapButton
      variant={variant}
      color={color}
      startIcon={startIcon}
      onClick={onClick}
      loading={loading}
      type={type}
      style={style}
      className={className}
      endIcon={endIcon}
      disabled={disabled}
    >
      {loading ? "" : children}
    </BootstrapButton>
  );
}

export default memo(ButtonCustom);
