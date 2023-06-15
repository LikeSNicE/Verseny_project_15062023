import React, { useEffect } from "react";
import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import InputCustom from "../../Components/InputCustom/InputCustom";
import styles from "./settingChannel.module.scss";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../..";

const SettingChannel = () => {

  const {handleSubmit,setValue,formState:{isValid},reset,register} = useForm();
  const {Authstore} = useContext(Context)


  useEffect(() => {
    reset({
      nickname: Authstore.user.nickname,
      description: Authstore.user.description
    })
  },[reset,Authstore.user])

  const onSubmit = (data) => {
    Authstore.updateDataChannel(data,Authstore.user.channel_id)
   
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.channelSettingLeft}
    >
      <div className={styles.channelSettingLeftTitle}>
        <div className={styles.channelSettingLeftTitleIcon}>
          {<AirplayOutlinedIcon />}
        </div>
        <div className={styles.channelSettingLeftTitleSubtitle}>Канал</div>
      </div>

      <div className={styles.channelSettingLeftField}>
        <div className={styles.channelSettingLeftFieldName}>Никнеим :</div>
        <div className={styles.channelSettingLeftFieldInput}>
          <InputCustom
            register={register("nickname", {
              required: "nickname",
            })}
            label="Никнейм"
          />
        </div>
      </div>

      <h4 className={styles.channelSettingLeftTitleDetails}>Подробности:</h4>

      <textarea
        // ref={register({ required: true, maxLength: 1000 })}
        onInput={(e) => setValue("description", e.target.value)}
        placeholder="Введите подробности"
        className={styles.channelSettingLeftTextArea}
      >
       {Authstore.user.description}
      </textarea>

      <ButtonCustom
        type="submit"
        disabled={!isValid}
        className={styles.channelSettingLeftBtn}
      >
        Редактировать
      </ButtonCustom>
    </form>
  );
};

export default SettingChannel;
