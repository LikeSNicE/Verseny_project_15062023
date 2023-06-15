import React, { useContext, useState } from "react";
import { ReactComponent as Logo } from "../../assets/images/icons/logo.svg";
import InputCustom from "../../Components/InputCustom/InputCustom";
import { useForm } from "react-hook-form";
import { Grid, Link } from "@mui/material";
import styles from "./Login.module.scss";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import AlertCustom from "../../Components/AlertCustom/AlertCustom";

function Login() {
  // use-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { Authstore } = useContext(Context);

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let prop in data) {
      formData.append(prop, data[prop]);
    }
    const loginResult = await Authstore.login(formData);
    if (loginResult.isAuth) {
      localStorage.setItem("token", loginResult.user.access_token);
      Authstore.setAuth(loginResult.isAuth);
      Authstore.setUser(loginResult.user.user);
    } else {
      setError(loginResult.message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
       className={styles.sectionLogin}
      >
        <div className={styles.containerLogin}>
          <div className={styles.containerLoginLogo}>
            <Logo />
            <h2>Добро пожаловать в Verseny</h2>
          </div>
          <Grid className={styles.containerLoginForm}>
            <InputCustom
              type="email"
              label="Введите email"
              errorText={errors?.email && errors?.email?.message}
              register={register("email", {
                required: "Поле обязателько к заполнению",
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            <div className={styles.containerLoginInput}>
              <InputCustom
                type="password"
                label="Введите пароль"
                errorText={errors?.password && errors?.password?.message}
                register={register("password", {
                  required: "Поле обязателько к заполнению",
                })}
              />
              <AlertCustom setError={setError} error={error} />
              <Link
                href="/forgot-password"
                underline="hover"
                sx={{ fontWeight: 700, fontSize: "14px", color: "#7272d8" ,width:"35%" }}
              >
                Забыли пароль?
              </Link>
            </div>
          </Grid>
          <ButtonCustom
            loading={Authstore.isLoadingButton}
            type="submit"
          >
            Войти
          </ButtonCustom>
          <div className={styles.containerLoginFlex}>
            <h3>Нету аккаунта?</h3>
            <Link
              href="signin/user"
              underline="hover"
              sx={{
                marginLeft: "5px",
                fontWeight: 700,
                fontSize: "16px",
                color: "#7272d8",
              }}
            >
              Так зарегистрируетесь
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default observer(Login);
