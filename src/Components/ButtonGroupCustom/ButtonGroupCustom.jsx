import React from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import styles from './ButtonGroupCustom.module.scss';
import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
const ButtonGroupCustom = () => {
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <div>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton
          className={
            styles.channelSettingLeftDetailsBtn +
            " " +
            styles.channelSettingLeftDetailsBtnBold
          }
          value="bold"
          aria-label="bold"
        >
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton
          className={
            styles.channelSettingLeftDetailsBtn +
            " " +
            styles.channelSettingLeftDetailsBtnItalic
          }
          value="italic"
          aria-label="italic"
        >
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton
          className={
            styles.channelSettingLeftDetailsBtn +
            " " +
            styles.channelSettingLeftDetailsBtnUnderlined
          }
          value="underlined"
          aria-label="underlined"
        >
          <FormatUnderlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ButtonGroupCustom;
