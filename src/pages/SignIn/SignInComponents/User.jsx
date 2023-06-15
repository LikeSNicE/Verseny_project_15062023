import React from 'react'
import TextFieldUI from '../../../Components/InputCustom/InputCustom';
import RadioButtonCustom from '../../../Components/RadioBtn/RadioBtn';
import {useOutletContext } from 'react-router-dom';
import styles from '../Signin.module.scss';

export default function User() {
  const contextOutlet = useOutletContext();
  
  return (
    <div className={styles.containerSigninForm}>
      <div className={styles.containerSigninForm}>
        <TextFieldUI
          type="email"
          label="Email"
          errorText={
            contextOutlet.errors?.email && contextOutlet.errors?.email?.message
          }
          register={contextOutlet.register("email", {
            required: "Поле обязателько к заполнению",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
        <TextFieldUI
          type="password"
          label="Пароль"
          errorText={
            contextOutlet.errors?.email && contextOutlet.errors?.email?.message
          }
          register={contextOutlet.register("password", {
            required: "Поле обязателько к заполнению",
            minLength: {
              value: 8,
              message: "Пароль должен содержать минимум 8 символов",
            },
          })}
        />
      </div>
      <TextFieldUI
        register={contextOutlet.register("name")}
        label="Введите Ф.И.О"
      />
      <RadioButtonCustom
        onChange={(e) => contextOutlet.setValue("gender", e.target.value)}
        defaultChecked={contextOutlet.getValues("gender")}
        radio={["Мужской", "Женский"]}
        formLabel={"Пол"}
      />
    </div>
  );
}
