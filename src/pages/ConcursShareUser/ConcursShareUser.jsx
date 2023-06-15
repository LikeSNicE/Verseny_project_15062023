import React, { useContext, useEffect, useState } from "react";
import styles from "./ConcursShareUser.module.scss";
import { Avatar,Typography,Button } from "@mui/material";
import SelectUI from "../../Components/Select/Select";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BreadCrums from "../../Components/BreadCrums/BreadCrums";
import { useParams } from "react-router-dom";
import TableUI from "../../Common/Table/Table";
import { useForm } from "react-hook-form";
import HandleCheckBox from "../../Common/Table/HandleCheckBox/HandleCheckBox";
import Popup from "../../Components/Popup/Popup";
import { Context } from "../..";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import IconCustom from "../../Components/IconCustom/IconCustom";
import { ApiUrl } from "../../api/api";

const ConcursShareUser = () => {
  const headData = ["","Имя","О файле"];
  const path = Object.values(useParams())[0];
  const {Partipicationstore} = useContext(Context);
  const [partipication,setPartipication] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  const [filePath, setFilePath] = useState([]);
  
  const arrayOption = [
    { label: "По новым", value: "1"},
    { label: "По а-я", value: "2"},
  ] 

  useEffect(()=>{
    Partipicationstore.getConcursShareUserFiles(path).then(res => {
      setPartipication(res);
      setIsLoading(false);
    });
  },[]);

  const { control, reset, handleSubmit } = useForm();
  const clear = () => {
    reset();
    setFilePath([]);
  };
  const sortFiles = (value) =>{
    console.log(value);
  }

  const downloadFile = () =>{
    window.open(ApiUrl+"download/file/"+path);
  }
  const downloadMultipleFile = () =>{
    for(let i = 0; i < filePath.length; i++){
      window.open(ApiUrl+"download/file/"+filePath[i]);
    }
    clear();
  }
  if(isLoading) {
    return <LoadingCustom/>
  }
  if(!partipication.success){
    return <NotFoundPage />
  }
  const dataBreads = [
    { id: "1", name: "Мой Файлы", path: -1 },
    { id: "2", name: partipication.participant.user.name },
  ];
  return (
    <div className={styles.sectionConcursShareUser}>
      <div className={styles.sectionConcursShareUserTitle}>Участник</div>

      <div className={styles.sectionConcursShareUserBlock}>
        <div className={styles.sectionConcursShareUserBlockInfo}>
          <Avatar
            className={styles.sectionConcursShareUserBlockInfoImg}
            src={partipication.participant.user.photo}
            alt={partipication.participant.user.alt}
          />
          <div className={styles.sectionConcursShareUserBlockInfoName}>
            {partipication.participant.user.alt}
          </div>
          <div className={styles.sectionConcursShareUserBlockInfoEmail}>
            {partipication.participant.user.email}
          </div>
        </div>
        <div className={styles.sectionConcursShareUserBlockUpload}>
          <div className={styles.sectionConcursShareUserBlockUploadDate}>
            <span>Дата загрузки:</span> {partipication.participant.details.date_upload}
          </div>
          <div className={styles.sectionConcursShareUserBlockUploadTypeParticipate}>
            Тип участия : <IconCustom icon={partipication.participant.details.type.icon}/> {partipication.participant.details.type.text}
          </div>
          <div className={styles.sectionConcursShareUserBlockUploadBtns}>
            <ButtonCustom
              className={styles.sectionConcursShareUserBlockUploadBtnFile}
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={downloadFile}
            >
              Скачать
            </ButtonCustom>
          </div>
        </div>
      </div>

      <div className={styles.sectionConcursShareUserChoose}>
        <div className={styles.sectionConcursShareUserSelect}>
          <SelectUI option={arrayOption} state={sortFiles} label={"Показать"} />
        </div>
      </div>
      <BreadCrums data={dataBreads} />
        <form onChange={(e) => handleSubmit(setFilePath(HandleCheckBox(e, filePath)))}>
          <TableUI data={partipication.files} head={headData} control={control} />
      </form>
      <Popup data={filePath} setData={clear}>
        <Button
          onClick={downloadMultipleFile}
          sx={{
            textTransform: "none",
            alignItems: "center",
            color: "#4A4A4E",
            margin: "0 10px",
          }}
          startIcon={<FileDownloadOutlinedIcon />}
        >
          <Typography>Скачать</Typography>
        </Button>
      </Popup>
    </div>
  );
};

export default ConcursShareUser;
