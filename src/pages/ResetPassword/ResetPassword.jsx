import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/icons/logo.svg";
import styles from "./ResetPassword.module.scss";
import TextFieldUI from "../../Components/InputCustom/InputCustom";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import { useForm } from "react-hook-form";
import AvatarCustom from "../../Components/AvatarCustom/AvatarCustom";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";
import FetchAuthService from "../../services/fetchService";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import AlertCustom from "../../Components/AlertCustom/AlertCustom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const { Authstore } = useContext(Context);
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState({
    avatar: "",
    nickname: "",
    description: "",
  });
  const [isLoading,setIsLoading] = useState(true);
  const [messageAlert,setMessage] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    FetchAuthService.recognizeUserToToken(token)
      .then((response) => {
        setSuccess(true);
        setUser(response.data.data);
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
      });
  }, [token]);

  const onSubmit = (data) => {
      Authstore.resetPassword({ ...data, user_id: user.id, email: user.email }).then(res=>{
        setMessage(res);
        setTimeout(()=>{
          navigate("/login")
        },6000)
      });
  };

  const getUserData = (user) => {
    return {
      name: user.name,
      description: user.email,
      avatar: user.avatar,
    };
  };

  if (isLoading) {
    return <LoadingCustom />;
  }

  if (!success) {
    return <NotFoundPage/>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionResetPas}>
      <img className={styles.sectionResetPasImg} src={Logo} alt="Logo" />
      <div className={styles.sectionResetPasTitle}>Сброс Пароля :</div>
      <div className={styles.sectionResetPasProfile}>
        <AvatarCustom
          sizeAvatar={{ width: "40px", height: "40px" }}
          data={getUserData(user)}
        />
      </div>
      <div className={styles.sectionResetPasInput}>
        <TextFieldUI
          type="password"
          label="Введите пароль"
          register={register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Пароль должен содержать минимум 8 символов",
            },
          })}
          errorText={errors?.password && errors?.password?.message}
        />
      </div>
      <div className={styles.sectionResetPasInput}>
        <TextFieldUI
          type="password"
          label="Введите пароль повторно"
          register={register("password_confirmation", {
            required: true,
          })}
          errorText={
            errors?.confirmPassword && errors?.confirmPassword?.message
          }
        />
      </div>
      <div className={styles.sectionResetPasInput}>
        <AlertCustom {...messageAlert} setError={setMessage}/>
      </div>
      <ButtonCustom className={styles.sectionResetPasBtn} type="submit" loading={Authstore.isLoadingButton}>
        Сбросить
      </ButtonCustom>
    </form>
  );
};

export default observer(ResetPassword);
