import React, { useState } from "react";
import styles from './ParticipateModal.module.scss';
import ModalCustom from "../../Modal/Modal";
import * as Muicon from "@mui/icons-material";
import InputFile from "../../InputFile/InputFile";
import FileProgress from "../../InputFile/FileProgress";
import { useForm } from "react-hook-form";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import IconCustom from "../../IconCustom/IconCustom";
import SetFormData,{ getAccept } from "./SetFormData";
import ConcursService from "../../../services/concursService";
import { useParams } from "react-router-dom";

const ModalParticipate = ({ isParticipation = false, participation,setContest,contest}) => {
  const [isOpen, setOpen] = useState();
  const AddReactionIcon = Muicon["AddReactionOutlined"];
  const [progress, setProgress] = useState(0);
  const { setValue, watch, handleSubmit } = useForm();
  const getFile = (fileData) => {
    setValue("files", fileData);
  };
  const {id} = useParams();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      SetFormData(formData,data);
      formData.append("contest_id",id);
      console.log(id);
      await ConcursService.setParticipation(formData,onUploadProgress)
      setTimeout(()=>{
        setContest({...contest,concurs: {...contest.concurs,isParticipation:true}})
        setOpen(false)
      },2000)
    } catch (error) {
      console.log(error);
    }
  };
  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    setProgress(percent);
  };

  return (
      <ModalCustom
        open={isOpen}
        setIsOpen={setOpen}
        btnStartIcon={<IconCustom icon={participation.icon} />}
        btnStyles={styles.participateBtn}
        btnLabel="Участие в конкурсе"
        btnDisabled = {isParticipation}
        iconTopSection={<AddReactionIcon />}
        iconTopSectionStyles={styles.participateBtnTopSection}
        TopSectiontext="Участие в конкурсе"
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.inputFiles}>
          <InputFile
            multiple={true}
            accept={getAccept(participation.text)}
            getFile={getFile}
          />
          <FileProgress
            progress={progress}
            file={Object.values(watch("files", []))}
            setFile={setValue}
          />
          {watch("files", []).length !== 0 && (
            <ButtonCustom 
            style={{ marginTop: "10px" }}
            type="submit">
              Отправить
            </ButtonCustom>
          )}
        </form>
      </ModalCustom>
  );
};

export default ModalParticipate;