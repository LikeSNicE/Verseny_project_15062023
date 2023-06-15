import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import { FormControlLabel } from "@mui/material";

export default function FormCheckBox({ valueCheckBox, control, idCheckBox }) {
  return (
    <FormControlLabel
      control={
        <Controller
          name={idCheckBox}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, ...field } }) => (
            <Checkbox
              {...field}
              value={valueCheckBox}
              checked={!!value}
              sx={{ color: "#7272D8", "&.Mui-checked": { color: "#9294C9" } }}
            />
          )}
        />
      }
    />
  );
}
