import React from "react";
import styles from "./Select.module.scss";
import {
  styled,
  InputBase,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #B4B4B5",
    fontSize: 16,
    padding: "8px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 10,
      borderColor: "#7272D8",
    },
  },
}));

function SelectUI(props) {
  const {
    label,
    option = [],
    getValue,
    size = "small",
    style,
    defaultValue = "1",
  } = props;
  const [options, setOptions] = React.useState(defaultValue);

  const handleChange = (event) => {
    setOptions(event.target.value);
    getValue && getValue(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard">
        <div style={{ display: "flex", alignItems: "center", height: "45px" }}>
          {label ? <div className={styles.labelSelect}>{label}</div> : ""}
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            input={<BootstrapInput />}
            value={options}
            onChange={handleChange}
            label={label}
            displayEmpty
            size={size}
            style={style}
            sx={{
              "& .css-15ak4lt-MuiSelect-select-MuiInputBase-input.css-15ak4lt-MuiSelect-select-MuiInputBase-input.css-15ak4lt-MuiSelect-select-MuiInputBase-input":
                {
                  borderTopLeftRadius: label ? "0px !important" : "",
                  borderBottomLeftRadius: label ? "0px !important" : "",
                },
            }}
          >
            {
              // eslint-disable-next-line array-callback-return
              option.map((item, index) => {
                // eslint-disable-next-line default-case
                switch (typeof item) {
                  case "string":
                    return (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    );
                  case "object":
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    );
                }
              })
            }
          </Select>
        </div>
      </FormControl>
    </div>
  );
}

export default SelectUI;
