import React from "react";
import * as Muicon from "@mui/icons-material";

export default function IconCustom({ icon }) {
  const Icon = Muicon[icon];
  return <Icon />;
}
