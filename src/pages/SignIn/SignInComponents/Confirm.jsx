import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextFieldUI from "../../../Components/InputCustom/InputCustom";
import styles from "../Signin.module.scss";
import FetchService from "../../../services/fetchService";

export default function Confirm() {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const contextOutlet = useOutletContext();

  const sendMailer = async () => {
    const result = await FetchService.sendMail(
      contextOutlet.getValues("email")
    );
    setIsLoading(result.isLoading);
    setSuccess(result.success);
  };
  useEffect(() => sendMailer, []);

  if (isLoading) {
    return (
      <div className={styles.containerLoading}>
        <CircularProgress sx={{ color: "#7272D8" }} />
      </div>
    );
  }

  if (!success) {
    return (
      <div className={styles.containerSigninForm}>
        <div className={styles.confirmEmailImgError}>
          <img
            src="https://media.istockphoto.com/id/1095047472/vector/error-page-dead-emoji-illustration.jpg?s=612x612&w=0&k=20&c=mEAErA572V--tYXvGYaNcclA17boFY8S8UwIgOgCZek="
            alt="email"
          />
        </div>
        <h3>Извините, мы не нашли вашу почту</h3>
        <p>
          Убедитесь что вы ввели почту верно или случились неполадки с сервером
        </p>
      </div>
    );
  }
  return (
    <div className={styles.containerSigninForm}>
      <img
        className={styles.confirmEmailImgSuccess}
        src="https://img.freepik.com/premium-vector/email-marketing-campaign_118813-6256.jpg?w=996"
        alt="email"
      />
      <h3>Здраствуйте, {contextOutlet.getValues("email")}</h3>
      <p>
        Мы отправили на вашу почту уведомление, с кодом для активаций вашего
        аккаунта
      </p>
      <TextFieldUI
        label="Введите код"
        register={contextOutlet.register("code")}
      />
    </div>
  );
}
