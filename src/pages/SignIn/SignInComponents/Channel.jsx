import React from "react";
import InputAvatar from "../../../Components/InputAvatar/InputAvatar";
import TextFieldUI from "../../../Components/InputCustom/InputCustom";
import { useOutletContext } from "react-router-dom";
import styles from "../Signin.module.scss";
import ConvertBase64 from '../../../services/fileService';

export default function ChannelForm() {
  const contextOutlet = useOutletContext();

  const getAvatar = (avatar, fullImage) => {
    contextOutlet.setValue("avatar", ConvertBase64(avatar, "avatar.png"));
    contextOutlet.setValue("fullImage", fullImage);
  };

  return (
    <div className={styles.containerSigninForm}>
      <InputAvatar
        getAvatar={getAvatar}
        defaultAvatar={contextOutlet.getValues("fullImage")}
      />
      <TextFieldUI
        register={contextOutlet.register("nickname")}
        label="Введите никнейм для канала"
      />
    </div>
  );
}
