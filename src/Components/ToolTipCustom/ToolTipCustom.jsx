import React from "react";
import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export default function TooltipCustom({ titleText, children,placement,classNameProp}) {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip
      className={classNameProp}
      {...props}
      arrow
      classes={{ popper: className }}
      placement={placement}
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      padding: "8px",
    },
  }));
  return <BootstrapTooltip title={titleText}>{children}</BootstrapTooltip>;
}
