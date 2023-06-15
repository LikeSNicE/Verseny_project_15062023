import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material";
import styles from "./TabsCustom.module.scss";

const theme = createTheme({
  typography: {
    fontFamily: ["Comfortaa", "cursive"].join(","),
  },
  palette: {
    primary: {
      main: "#000",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={styles.TabPanelParent}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TabsCustom({ dataTabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {dataTabs.map((item) => (
              <Tab
                key={item.id}
                icon={item.icon}
                iconPosition="start"
                sx={{ textTransform: "inherit", minHeight: "48px" }}
                label={<div>{item.label}</div>}
              />
            ))}
          </Tabs>
        </Box>
        {dataTabs.map((item, index) => (
          <TabPanel key={item.id} index={index} value={value}>
            {item.value}
          </TabPanel>
        ))}
      </Box>
    </ThemeProvider>
  );
}
