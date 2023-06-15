import React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";

function AlertCustom({ error = "", setError, severity = "error" }) {
  if (error.length === 0) {
    return;
  }
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity} onClose={() => setError("")}>
        <AlertTitle>{severity === "error" ? "Ошибка" : "Успех"}</AlertTitle>
        <strong>{error}</strong>
      </Alert>
    </Stack>
  );
}

export default AlertCustom;
