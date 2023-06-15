import React, { useState } from "react";
import { Button} from "@mui/material";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";
import styles from "./ProfileSettings.module.scss";
import SettingUser from "../settingUser/settingUser";
import SettingChannel from "../settingChannel/settingChannel";
import ModalDeleteAccount from "../../Components/ModalComponents/ModalDeleteAccount/ModalDeleteAccount";
import TooltipCustom from "../../Components/ToolTipCustom/ToolTipCustom";
import ModalCustom from "../../Components/Modal/Modal";
import TabsCustom from "../../Components/TabsNavCustom/TabsNavCustom";
import InputAvatarModal from "../../Components/ModalComponents/InputAvatarModal/InputAvatarModal";
import imgEdit from "../../assets/images/icons/Edit.svg";
import * as Muicon from "@mui/icons-material";
import { useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import InputBannerModal from "../../Components/ModalComponents/InputBannerModal/InputBannerModal";
import { isFileByUrl } from "../../Common/Table/isFileByUrl/isFileToUrl";

const ProfileInfoChannel = () => {
  // State
  const [hovered, setHovered] = useState(false);
  const [isAvatar, setIsAvatar] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { Authstore } = useContext(Context);

  //
  const { id, created_at, email, gender, avatar, name, nickname,header } =
    Authstore.user;

  const location = useLocation();
  if (location.pathname === "/profileInfoChannel/setting") {
    return <Navigate to={"/profileInfoChannel/setting/user"} />;
  }


  // icons
  const AirplayOutlinedIcon = Muicon["AirplayOutlined"];
  const AlternateEmailOutlinedIcon = Muicon["AlternateEmailOutlined"];
  const CardGiftcardOutlinedIcon = Muicon["CardGiftcardOutlined"];
  const EmailOutlinedIcon = Muicon["EmailOutlined"];
  const PersonOutlineOutlinedIcon = Muicon["PersonOutlineOutlined"];
  const EditOutlinedIcon = Muicon["EditOutlined"];



  return (
    <div className={styles.profile}>
      {/*profile header*/}
      <div className={styles.profileBanner}>
        <img
          className={styles.profileBannerImg}
          src={
            isFileByUrl(header)
              ? header
              : "https://klike.net/uploads/posts/2022-12/1671597724_3-61.jpg"
          }
          alt="profile header_photo"
        />
        <ModalCustom
          rootClass={styles.profileBannerEditBtn}
          iconTopSection={<EditOutlinedIcon />}
          iconTopSectionStyles={styles.modalSectionTopIcon}
          TopSectiontext="Изменение баннера"
          btnStyles={styles.editBtn}
          btnLabel="Изменить баннер"
          btnStartIcon={<EditOutlinedIcon />}
          open={isOpen}
          setIsOpen={setOpen}
        >
          <InputBannerModal setIsOpen={setOpen} />
        </ModalCustom>
      </div>

      {/*Profile Section*/}
      <div className={styles.profileSection}>
        <div className={styles.profileSectionInfoLeft}>
          <div>
            <Button
              variant="contained"
              component="label"
              className={styles.profileSectionInfoLeftLink}
              onMouseLeave={() => setHovered(false)}
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHovered(true);
              }}
            >
              {hovered ? (
                <div>
                  <div className={styles.profileSectionInfoLeftLinkHover}>
                    <img
                      src={imgEdit}
                      alt=""
                      onClick={() => setIsAvatar(true)}
                    />
                  </div>
                </div>
              ) : (
                <img
                  className={styles.profileSectionInfoLeftImg}
                  src={avatar}
                  alt="photoOfUser"
                />
              )}
            </Button>
            <div className={styles.profileSectionModalAvatar}>
              <ModalCustom
                iconTopSectionStyles={styles.modalSectionTopIcon}
                iconTopSection={<Muicon.EditOutlined />}
                TopSectiontext="Изменение фото профиля"
                open={isAvatar}
                setIsOpen={setIsAvatar}
              >
                <InputAvatarModal setIsOpen={setIsAvatar} />
              </ModalCustom>
            </div>
          </div>
          <div className={styles.profileSectionInfoLeftText}>
            <p className={styles.profileSectionInfoLeftTextName}>{name}</p>
            <p className={styles.profileSectionInfoLeftTextCompany}>
              {nickname}
            </p>
          </div>
        </div>

        <div className={styles.profileSectionInfoRight}>
          <div>
            <Link to="/mychannel">
              <TooltipCustom placement="top" titleText={"Мой канал"}>
                <Button className={styles.profileSectionInfoRightIconChannel}>
                  <AirplayOutlinedIcon />
                </Button>
              </TooltipCustom>
            </Link>
          </div>
          <div>
            <div className={styles.profileSectionInfoRightIconDelete}>
              <ModalDeleteAccount />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.profileSetting}>
        <div className={styles.profileSettingLeft}>
          <Routes>
            <Route path="setting/user" element={<SettingUser />} />
            <Route path="setting/channel" element={<SettingChannel />} />
          </Routes>
        </div>

        {/* <SettingChannel/> */}

        {/*Setting user right*/}
        <div className={styles.profileSettingRight}>
          <div className={styles.profileSettingRightTop}>
            <h3>Личные данные</h3>
            <div className={styles.profileSettingRightTopData}>
              <TabsCustom
                className={styles.profileSettingRightTopDataIcon}
                to={"setting/user"}
                children={"Профиль"}
              >
                <PersonOutlineOutlinedIcon />
                Профиль
              </TabsCustom>
            </div>
            <div className={styles.profileSettingRightTopData}>
              <TabsCustom
                className={styles.profileSettingRightTopDataIcon}
                to={"setting/channel"}
              >
                <AirplayOutlinedIcon />
                Канал
              </TabsCustom>
            </div>
          </div>

          <div className={styles.profileSettingRightBottom}>
            <h3>Подробная информация</h3>
            <div className={styles.profileSettingRightBottomData}>
              <p>{<AlternateEmailOutlinedIcon />}</p>
              <p>id : {id}</p>
            </div>
            <div className={styles.profileSettingRightBottomData}>
              <p>{<CardGiftcardOutlinedIcon />}</p>
              <p>Дата создание аккаунта: {created_at} г.</p>
            </div>
            <div className={styles.profileSettingRightBottomData}>
              <p>{<EmailOutlinedIcon />}</p>
              <p>Email : {email}</p>
            </div>
            <div className={styles.profileSettingRightBottomData}>
              <p>{<PersonOutlineOutlinedIcon />}</p>
              <p>Пол : {gender}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ProfileInfoChannel);
