import React, { useReducer, useEffect } from "react";
import styles from "./CounterCustom.module.scss";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { ButtonGroup,styled } from "@mui/material";


export default function CounterCustom({
  max = 10,
  min = 1,
  getValue,
  defaultValue = 1,
}) {
  const initialState = { count: defaultValue };

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        if (state.count < max) {
          return { count: state.count + 1 };
        }
        return { count: state.count };
      case "decrement":
        if (state.count > min) {
          return { count: state.count - 1 };
        }
        return { count: state.count };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getValue && getValue(state.count);
  }, [state.count]);

  const ButtonGroupStyled = styled(ButtonCustom)({
    "&.MuiButtonGroup-root MuiButtonGroup-contained MuiButtonGroup-disableElevation css-uxd1ve-MuiButtonGroup-root":
      {
        height: '40px !important'
      },
  });

  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
      <ButtonCustom
        color="primary"
        className={styles.counterButton}
        onClick={() => dispatch({ type: "increment" })}
      >
        +
      </ButtonCustom>
      <div className={styles.counter}>{state.count}</div>
      <ButtonCustom
        color="primary"
        className={styles.counterButton}
        onClick={() => dispatch({ type: "decrement" })}
      >
        -
      </ButtonCustom>
    </ButtonGroup>
  );
}
