import * as React from "react";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { Snackbar, Alert } from "@mui/material";

export default function SubComponents() {
  const [isSub, setIsSub] = React.useState(false);
  const [isSnack, setIsSnack] = React.useState(false);
  const toggleSub = () => {
    setIsSub(!isSub);
    setIsSnack(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setIsSnack(false);
  };
  return (
    <div>
      <ButtonCustom onClick={toggleSub} color={isSub ? "primary" : "error"}>
        {isSub ? "Вы подписаны" : "Подписаться"}
      </ButtonCustom>
      <Snackbar open={isSnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={() => setIsSnack(false)}
          severity={isSub ? "success" : "error"}
        >
          {isSub ? "Вы подписались" : "Вы отписались"}
        </Alert>
      </Snackbar>
    </div>
  );
}
