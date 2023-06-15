import React from "react";
import Logo from "../../assets/images/icons/logo.svg";
import styles from "./ForgotPassword.module.scss";
import TextFieldUI from "../../Components/InputCustom/InputCustom";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import AlertCustom from "../../Components/AlertCustom/AlertCustom";
import { useState } from "react";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  
  const { Authstore } = useContext(Context);
  const [message,setMessage] = useState({});
  const navigate = useNavigate();
  const onSubmit = (data) => {
    Authstore.forgotPassword(data.email).then(res => {
      setMessage(res);
      setTimeout(()=>{
        navigate("/login")
      },6000)
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionResPas}>
      <img className={styles.sectionResPasImg} src={Logo} alt="Logo" />
      <div className={styles.sectionResPasTitle}>Забыли пароль ?</div>
      <div className={styles.sectionResPasSubtitle}>
        Выход есть! Для этого мы можем отправить вам на почту инструкций для
        востаналение:
      </div>
      <div className={styles.sectionResPasInput}>
        <TextFieldUI
          type="email"
          label="Введите email"
          errorText={errors?.email && errors?.email?.message}
          register={register("email", {
            required: "Поле обязателько к заполнению",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
      </div>

      <div className={styles.notification}>
        <AlertCustom
          {...message}
          setError={setMessage}
        />
      </div>

      <ButtonCustom
        type="submit"
        disabled={!isValid}
        className={styles.sectionResPasBtn}
        loading={Authstore.isLoadingButton}
      >
        Отправить
      </ButtonCustom>

      <div className={styles.sectionResPasNotExistUser}>
        <p>Нету аккаунта? </p>
        <Link 
          to="/signin/user" 
          underline="hover"
          sx={{
            marginLeft: "5px",
            fontWeight: 700,
            fontSize: "16px",
            color: "#7272d8",
          }}>Так зарегистрируетесь
        </Link>
      </div>
    </form>
  );
};

export default observer(ForgotPassword);
