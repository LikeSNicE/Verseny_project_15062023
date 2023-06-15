import {AppBar, Avatar, Box, Typography, Menu, MenuItem, Divider, Stack, Tabs, Tab, ThemeProvider,} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { CustomLinkIcon } from "../../Components/CutsomLink/CustomLink";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import IconButton from "@mui/material/IconButton";
import Logo from "../../assets/images/icons/logo.svg";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import IconCustom from "../../Components/IconCustom/IconCustom";
import HeaderJson from "./HeaderJson.json";
import MenuHeaderJson from "./MenuHeaderJson.json";
import { ToolBarStyled, theme,getIndex } from "./HeaderHelper";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {Authstore} = useContext(Context)
  const {nickname,name,avatar} = Authstore.user;
  const {pathname} = useLocation(); 
  const [index,setIndex] = useState(0);

  useEffect(()=>{
    setIndex(getIndex(pathname,index))
  },[pathname])
  if(!Authstore.isAuth){
    return (
      <div className={styles.sectionLogin}>
      <AppBar position="static">
        <ToolBarStyled className={styles.sectionLoginToolBar}>
          <ButtonCustom className={styles.sectionLoginBtnLogin}>
            <Link to="/login">Войти</Link>
          </ButtonCustom>
          <ButtonCustom
            className={styles.sectionLoginBtnRegistration}
            variant="outlined"
          >
            <Link to="/signin">Регистация</Link>
          </ButtonCustom>
        </ToolBarStyled>
      </AppBar>
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mb: "40px" }}>
          <AppBar position="static">
            <ToolBarStyled>
              <IconButton>
                <Avatar src={Logo} />
              </IconButton>
              <Tabs
                value={index}
                aria-label="icon position tabs example"
                indicatorColor="primary"
              >
                {HeaderJson.map((item,index)=>
                <Tab
                  component={Link}
                  to={item.to}
                  value={index}
                  icon={<IconCustom icon={item.icon} />}
                  iconPosition="top"
                  label={item.label}
                  style={{gap: "5px"}}
                />)}
              </Tabs>

              <Avatar
                onClick={(e) => setIsOpen(true)}
                src={avatar}
                alt={name}
                sx={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                }}
              />
            </ToolBarStyled>

            {/* Menu of profile*/}

            <Menu
              className={styles.menuProfile}
              id="basic-menu"
              aria-labelledby="demo-positioned-button"
              open={isOpen}
              onClose={() => setIsOpen(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "top",
              }}
              sx={{
                mt: "3em",
              }}
            >
              <Stack className={styles.menuProfileBox}>
                <div className={styles.menuProfileBoxLeft}>
                  <Typography className={styles.menuProfileBoxLeftAuthor}>
                    {name}
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    className={styles.menuProfileBoxLeftCompany}
                  >
                    {nickname}
                  </Typography>
                </div>
                <div>
                  <Avatar src={avatar} alt={name} />
                </div>
              </Stack>
              <Divider />
              <div className={styles.menuProfileItems}>
                {MenuHeaderJson.map((item,index)=>
                  <MenuItem onClick={() => setIsOpen(false)} key={index}>
                    <CustomLinkIcon
                      to={item.to}
                      children={item.children}
                      Icon={<IconCustom icon={item.icon}/>}
                      className={styles.menuProfileItemLink}
                    />
                  </MenuItem>
                )}
              </div>
            </Menu>
          </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default observer(Header);