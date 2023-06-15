import React, { useContext, useState } from "react";
import styles from "./create.module.scss";
import stepperData from "./stepperCreateData.json";
import StepperUI from "../../../Components/Stepper/Stepper";
import ButtonStepper from "../../../Components/Stepper/ButtonStepper";
import { useMatch, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../..";
import { GetJsonWinners } from "./pages/prizesDataTable";
import AlertCustom from "../../../Components/AlertCustom/AlertCustom";
import { observer } from "mobx-react-lite";

const CreateComponent = () => {
  const [step, setStep] = useState(1);
  const [alert,setAlert] = useState({});
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const {Conteststore} = useContext(Context);
  const onSubmit = async (data) =>{
    let dataNew = GetJsonWinners(data);
    const responce = await Conteststore.AddContest(dataNew);
    if(responce.success){
      return navigate("/mychannel");
    } 
    return setAlert({error:"Извините что то пошло не так"});
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionCreate}>
      <div style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}>
        <StepperUI steps={stepperData} activeStep={step} />
      </div>

      {useMatch(stepperData[step - 1].fullPath) ? (
        <Outlet context={{ register, setValue, getValues, watch }} />
      ) : (
        <Navigate to={stepperData[step - 1].path} />
      )}
      <AlertCustom {...alert} setError={setAlert}/>
      <div className={styles.sectionCreateBtnNext}>
        <ButtonStepper
          setStep={setStep}
          activeStep={step}
          stepRoute={stepperData}
          buttonStepperText={{
            finallyButton: "Зарегистрируетесь",
            nextButton: "Далее",
            loading:Conteststore.isLoadingButton
          }}
          endStep={stepperData.length}
        />
      </div>
    </form>
  );
};

export default observer(CreateComponent);
