import React, { useContext, useEffect, useState } from "react";
import styles from "./update.module.scss";
import { useParams } from "react-router-dom";
import TabsCustom from "../../../Components/TabsNavCustom/TabsNavCustom";
import { Outlet } from "react-router-dom";
import { Context } from "../../..";
import { useForm } from "react-hook-form";
import { convertDataUpdate, filterFormData } from "./pages/prizesUpdateData";
import LoadingCustom from "../../../Components/LoadingCustom/LoadingCustom";
import { tabCustom } from "./pages/prizesUpdateData";
import AlertCustom from "../../../Components/AlertCustom/AlertCustom";
import { observer } from "mobx-react-lite";

const UpdateConcurs = () => {
  const {Conteststore} = useContext(Context);
  const {id} = useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [message,setMessage] = useState({});
  const {reset,handleSubmit,register,getValues,watch,setValue} = useForm();
  useEffect(()=>{
    Conteststore.GetContest(id).then(responce =>{
      reset(convertDataUpdate(responce.contest.concurs))
      setIsLoading(false);
    })
  },[id,reset,Conteststore]);
  let isLoadingButton = Conteststore.isLoadingButton;
  const onSubmit = async (data) =>{
    await Conteststore.updateContest(id,filterFormData(data))
    .then((responce) =>{
      setMessage(responce);
    });
  }
  return (
    <div className={styles.sectionUpdate}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionUpdateLeft}>
        {isLoading ? <LoadingCustom/> : <Outlet context={{register,getValues,setValue,watch,isLoadingButton}} />}
        <AlertCustom {...message} setError={setMessage} />
      </form>
      <div className={styles.sectionUpdateRight}>
        <div className={styles.sectionUpdateRightTitle}>О конкурсе</div>
        {tabCustom.map((item) =>
          <div className={styles.sectionUpdateRightTabBlock}>
          <TabsCustom
            className={styles.sectionUpdateRightTabs}
            to={item.to}
            children={item.children}
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(UpdateConcurs);
