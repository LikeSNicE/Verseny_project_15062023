import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/images/icons/logo.svg";
import styles from "./Signin.module.scss";
import StepperUI from "../../Components/Stepper/Stepper";
import ButtonStepper from "../../Components/Stepper/ButtonStepper";
import { Outlet, useMatch, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AlertCustom from "../../Components/AlertCustom/AlertCustom";
import { useContext } from "react";
import { Context } from "../..";


const stepRoute = [
  {
    label: "Профиль",
    path: "user",
    fullPath: "signin/user",
  },
  {
    label: "Канал",
    path: "channel",
    fullPath: "signin/channel",
  },
  {
    label: "Подверждение почты",
    path: "confirm",
    fullPath: "signin/confirm",
  },
];

export default function Signin() {
  const [step, setStep] = useState(1);
  const [isError, setError] = useState("");
  const {Authstore} = useContext(Context) 
 
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    try {
      delete data.fullImage;
      const formdata = new FormData();
      for (let prop in data) {
        formdata.append(prop, data[prop]);
      }
      Authstore.register(formdata)
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

 



  return (
    <div
      className={styles.sectionSignin}
    >
      <div className={styles.containerSignin}>
        <div className={styles.containerSigninLogo}>
          <Logo />
          <h2>Создание аккаунта</h2>
        </div>


        <StepperUI activeStep={step} steps={stepRoute} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {useMatch(stepRoute[step - 1].fullPath) ? (
            <Outlet context={{ register, setValue, getValues, errors }} />
          ) : (
            <Navigate to={stepRoute[step - 1].path} />
          )}

          <div className={styles.confirmAlertError}>
            <AlertCustom error={isError} setError={setError}/>
          </div>

          <ButtonStepper
            stepRoute={stepRoute}
            activeStep={step}
            setStep={setStep}
            endStep={stepRoute.length}
            buttonStepperText={{
              finallyButton: "Зарегистрировать",
              nextButton: "Далее",
            }}
          />
         
        </form>
      </div>
    </div>
  );
}
