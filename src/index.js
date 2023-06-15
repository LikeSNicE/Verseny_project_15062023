import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./pages/App/App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AuthStore from "./mobx/authStore";
import { createContext } from "react";
import UserStore from "./mobx/userStore";
import ContestStore from "./mobx/contestStore";
import ChannelStore from "./mobx/channelStore";
import PartipicationStore from "./mobx/partipicationStore";

const Authstore = new AuthStore();
const Userstore = new UserStore();
const Conteststore = new ContestStore();
const Channelstore = new ChannelStore();
const Partipicationstore = new PartipicationStore();
if (localStorage.getItem("token") !== null) {
  Authstore.refresh();
  Conteststore.GetCategoriesAndTypes()
}


export const Context = createContext({
  Authstore,
  Userstore,
  Conteststore,
  Channelstore,
  Partipicationstore
});

const theme = createTheme({
  typography: {
    fontFamily: ["Comfortaa", "cursive"].join(","),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Context.Provider value={{ Authstore,Userstore,Conteststore,Channelstore,Partipicationstore }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
