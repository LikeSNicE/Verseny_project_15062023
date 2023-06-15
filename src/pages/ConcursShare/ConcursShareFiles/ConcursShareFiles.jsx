import React,{useState} from "react";
import { useForm } from "react-hook-form";
import HandleCheckBox from "../../../Common/Table/HandleCheckBox/HandleCheckBox";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BreadCrums from "../../../Components/BreadCrums/BreadCrums";
import Popup from "../../../Components/Popup/Popup";
import TableUI from "../../../Common/Table/Table";
import {Typography,Button} from '@mui/material';
import { ApiUrl } from "../../../api/api";

const ConcursShareFiles = ({fileData = []}) => {

const head = ["", "Имя", "О файле", "Пользователь"];

  const dataBreads = [
    {
      id: "1",
      name: "Мои Файлы",
      path: "/mychannel/concurs-share/id/files",
    },
  ];

  // new Table
  const [filePath, setFilePath] = useState([]);

  const { control, reset, handleSubmit } = useForm();

  const clear = () => {
    reset();
    setFilePath([]);
  };
  const onDownload = () =>{
    for(let i = 0; i < filePath.length; i++){
      window.open(ApiUrl+"download/file/"+filePath[i]);
    }
    clear();
  }
  return (
    <div>
      <BreadCrums data={dataBreads} />

      <form
        onChange={(e) => handleSubmit(setFilePath(HandleCheckBox(e, filePath)))}
      >
      {fileData.length !== 0 ?
      <TableUI data={fileData} head={head} control={control} /> :
      <div style={{textAlign:"center"}}>
        <img src="https://img.freepik.com/free-vector/characters-of-people-searching-through-files_53876-43126.jpg?w=900&t=st=1686675120~exp=1686675720~hmac=c5ae3c9eb23549cbe8d5b5dbe294393d81260922a1b462c958dbc2b2986050b3" alt="not_found" />
        <h3>Данном конкурсе участники отсутвуют</h3>
      </div>
      }
      </form>
      <Popup data={filePath} setData={clear}>
        <Button
          onClick={onDownload}
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

export default ConcursShareFiles;
