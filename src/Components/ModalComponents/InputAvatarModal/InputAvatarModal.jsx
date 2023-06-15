import React, { useState } from "react";
import styles from './InputAvatar.module.scss';
import { useForm } from "react-hook-form";
import InputAvatar from "../../InputAvatar/InputAvatar";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import AlertCustom from "../../AlertCustom/AlertCustom";
import { useContext } from "react";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import dataURLtoFile from "../../../services/fileService";

const InputAvatarModal = ({ setIsOpen }) => {
  const { Authstore } = useContext(Context);
  const { handleSubmit, watch, setValue } = useForm();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const onSubmit = async (data) => {
    try {
      const formdata = new FormData();
      for (let prop in data) {
        formdata.append(prop, data[prop]);
      }

      const response =  await Authstore.updatePhoto(formdata);
      Authstore.setUser(response.data);
      console.log(response.data);
      setMessage("Вы успешно обновили аватар :)");
      setSeverity("success");
      setTimeout(() => {
        setIsOpen(false)
      }, 2000);
    } catch (error) {
      setMessage("Извините что-то пошло не так");
      setSeverity("error");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputAvatar
          getAvatar={(avatar) =>
            setValue("avatar", dataURLtoFile(avatar, "avatar.jpg"))
          }
        />
        {watch("avatar", "").length !== 0 && (
          <ButtonCustom type="submit" style={{ marginTop: "10px" }}>
            Загрузить
          </ButtonCustom>
        )}

        {/* <AlertCustom severity={severity} error={message} setError={setMessage} /> */}
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

export default observer(InputAvatarModal);
