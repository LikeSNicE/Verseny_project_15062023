import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        color: "#7272d8",
        "&.Mui-checked": {
          color: "#7272d8",
        },
      }}
      disableRipple
      {...props}
    />
  );
}

export default function RadioButtonCustom({
  radio,
  formLabel,
  row = true,
  className,
  defaultChecked = "",
  onChange,
}) {
  const [checked, setChecked] = React.useState(
    defaultChecked.length === 0 ? "" : defaultChecked
  );

  const OnChangeRadioButton = (e) => {
    setChecked(e.target.value);
    onChange(e.target.value);
  };
  return (
    <FormControl className={className}>
      <p>{formLabel}</p>
      <RadioGroup
        value={checked}
        // defaultValue={checked}
        row={row}
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        defaultValue={"Мужской"}
      >
        {radio.map((valueRadio, index) => (
          <FormControlLabel
            key={index}
            value={valueRadio}
            control={<BpRadio />}
            label={valueRadio}
            onChange={OnChangeRadioButton}
          
          />
        ))}
        {console.log(defaultChecked)}
      </RadioGroup>
    </FormControl>
  );
}
