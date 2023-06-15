import React, { useState, useContext } from "react";
import styles from "./InputBannerModal.module.scss";
import { useForm } from "react-hook-form";
import dataURLtoFile from "../../../services/fileService";

import ImageUploader from "../../ImageUploader/ImageUploader";
import InputBanner from "../../InputBanner/InputBanner";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import AlertCustom from "../../AlertCustom/AlertCustom";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const InputBannerModal = ({setIsOpen}) => {
  const { setValue, handleSubmit,watch } = useForm();
  const { Authstore } = useContext(Context);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const onSubmit = async (data) => {
    const formdata = new FormData();
    for (let prop in data) {
      formdata.append(prop, data[prop]);
    }
    try {
      const response = await Authstore.updatePhoto(formdata);
      Authstore.setUser(response.data)
      setMessage("Вы успешно обновили аватар :)");
      setSeverity("success");
      setTimeout(() => {
        setIsOpen(false)
      }, 2000);
    } catch (error) {
      setMessage("Извините что-то пошло не так");
      setSeverity("error");
    }
   
  };

  const getImage = (croppedImage) => {
    let File = dataURLtoFile(croppedImage, "header.jpg");
    setValue("header", File);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBanner
          getImage={getImage}
          size={{
            width: "100%",
            height: "270px",
          }}
          aspect={4 / 1}
        />
        {watch("header", "").length !== 0 && (
          <ButtonCustom  type="submit" style={{ marginTop: "10px" }}>
            Загрузить
          </ButtonCustom>
        )}
      </form>
      <div className={styles.notification}>
        <AlertCustom
          severity={severity}
          error={message}
          setError={setMessage}
        />
      </div>
    </div>
  );
};

export default observer(InputBannerModal);
