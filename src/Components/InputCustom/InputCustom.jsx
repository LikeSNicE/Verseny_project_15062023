import { TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useMemo } from "react";

function TextFieldUI(props) {
  const {
    label,
    variant,
    id,
    style,
    type = "text",
    register,
    errorText = "",
    inputProps = {}
  } = props;

  const [error,setError] = useState("");
  useMemo(()=>{
    setError(errorText)
  },[errorText]);

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#7272D8",
    },
    "& label.MuiFormLabel-root": {
      fontWeight: "bold",
      fontSize: "16px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7272d8",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "2px solid #B4B4B5",
        color: "#B4B4B5",
        borderRadius: "10px",
        height: "50px",
      },
      "&:hover fieldset": {
        borderColor: "#7272D8",
        color: "#7272D8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7272D8",
      },
    },
    "& .css-1g24dm6-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "5px 10px",
    },
    "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "10px",
    },
    "& .css-1o6kl88-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "10px",
    },
  });
  return (
    <CssTextField
      id={id}
      type={type}
      style={{ ...style, width: "100%" }}
      variant={variant}
      label={label}
      size="small"
      error={error.length !== 0}
      helperText={error.length !== 0 && error}
      
      inputProps={inputProps}
      {...register}
    />
  );
}

export default TextFieldUI;