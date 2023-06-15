import React, { useState } from "react";
import {
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SelectUI from "../../Select/Select";
import styles from "./ModalConcursShare.module.scss";
import Popup from "../../Popup/Popup";
import BreadCrums from "../../BreadCrums/BreadCrums";
import ModalCustom from "../../Modal/Modal";
import TableUI from "../../../Common/Table/Table";
import { headData,dataTable } from "./ModalConcursShareData";
import {useForm} from "react-hook-form";
import HandleCheckBox from "../../../Common/Table/HandleCheckBox/HandleCheckBox";

const ModalConcursShare = () => {
  // модалка
  const [modal, setModal] = useState(false);

  const dataBreads = [
    { id: "1", name: "Мой Файлы", path: "/to" },
    { id: "2", name: "Луценко Никита" },
  ];

  

    const [filePath, setFilePath] = useState([]);

    const { control, reset, handleSubmit } = useForm();

    const clear = () => {
      reset();
      setFilePath([]);
    };

  // select with filtering


  const arrayOption = [
    { label: "По дате", value: "1" },
    { label: "По количеству", value: "2" },
  ];

  // UI
  return (
    <div className={styles.modal}>
      <ModalCustom
        icon={<RemoveRedEyeOutlinedIcon />}
        iconStyles={styles.modalTopBoxIcon}
        open={modal}
        setIsOpen={setModal}
        text="Посмотреть"
        btnStyles={styles.modalTopBoxIcon}
        btnLabel={<RemoveRedEyeOutlinedIcon />}
        heightModal="700px"
        iconTopSection={<RemoveRedEyeOutlinedIcon />}
        iconTopSectionStyles={styles.modalTopBoxIcon}
        TopSectiontext="Просмотр файлов : Луценко Никита"
      >
        <div className={styles.modalTopUserBox}>
          <div className={styles.modalTopUserBoxLeft}>
            <div>
              {" "}
              <Avatar src="https://avatars.githubusercontent.com/u/85344443?s=400&u=6c92f6fc049c598f01fa6554b575c74dbf789e07&v=4" />
            </div>
            <div className={styles.modalTopUserBoxLeftTextInfo}>
              <p>Луценко Никита</p>
              <p>bekkozha.ayan@mail.ru</p>
            </div>
          </div>
          <div className={styles.modalTopUserBoxRight}>
            <div className={styles.modalTopUserBoxRightDownloadBtn}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  background: "#7272D8",
                  "&:hover": {
                    background: "#7272D8",
                  },
                }}
              >
                <FileDownloadOutlinedIcon />
                <input hidden download />
              </Button>
            </div>
          </div>
        </div>

        <BreadCrums data={dataBreads} />

        <div className={styles.selectFilter}>
          <SelectUI option={arrayOption} label={"Показать"} />
        </div>

        <form
          onChange={(e) =>
            handleSubmit(setFilePath(HandleCheckBox(e, filePath)))
          }
        >
          <div className="">
            <TableUI data={dataTable} head={headData} control={control} />
          </div>
        </form>
        <Popup data={filePath} setData={clear}>
          <Button
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
          <Button
            sx={{
              textTransform: "none",
              alignItems: "center",
              color: "#4A4A4E",
              margin: "0 10px",
            }}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            <Typography>Удалить</Typography>
          </Button>
        </Popup>
      </ModalCustom>
    </div>
  );
};

export default ModalConcursShare;
