import React, { useState, useRef } from "react";
import styles from "./InputAvatar.module.scss";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Alert, AlertTitle, Stack } from "@mui/material";
import Avatar from "react-avatar-edit";
import ButtonCustom from "../ButtonCustom/ButtonCustom";

export default function InputAvatar({ getAvatar, defaultAvatar }) {
  const checkImage = defaultAvatar !== undefined ? defaultAvatar : "";
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(checkImage);
  const inputRef = useRef();

  const dragStart = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragEnd = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onCrop = (view) => {
    getAvatar(view, image);
  };
  const onClose = () => {
    setDrag(false);
    getAvatar("");
    setImage("");
  };
  const onSetFileHandler = (e, avatar) => {
    e.preventDefault();
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(avatar[0].type)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(avatar[0]);
      fileReader.onload = () => {
        setImage(fileReader.result);
        setError("");
      };
    } else {
      setError("Данный файл не является фотографией!!");
      setDrag(false);
      
    }
  };

  if (image.length !== 0)
    return (
      <div className={styles.dragDropContainerGap}>
        <div className={styles.avatarCreating}>
          <Avatar
            imageWidth={600}
            src={image}
            onClose={onClose}
            onCrop={onCrop}
            cropRadius={0}
            imageHeight={600}
          />
        </div>
        <div style={{ display: "flex" }}>
          <ButtonCustom
            variant="outlined"
            color="error"
            onClick={onClose}
            style={{ width: "100%" }}
          >
            Закрыть
          </ButtonCustom>
        </div>
      </div>
    );

  return (
    <div style={{ display: "grid" }}>
      <div className={styles.dragDropBorder}>
        <div className={styles.dragDropContainer}>
          <div>
            {drag ? (
              <div
                className={styles.dragDropContainerGap}
                onDragStart={(e) => dragStart(e)}
                onDragLeave={(e) => dragEnd(e)}
                onDragOver={(e) => dragStart(e)}
                onDrop={(e) => onSetFileHandler(e, e.dataTransfer.files)}
              >
                <div className={styles.dragDropContainerIcon}>
                  <h4>Отпустите файлы, чтобы загрузить их</h4>
                </div>
                <div className={styles.dragDropAdvice}>
                  Советуем использовать файлы высокого качества в формате
                  .jpg(размером меньше 5 мб)
                </div>
              </div>
            ) : (
              <div
                className={styles.dragDropContainerGap}
                onDragStart={(e) => dragStart(e)}
                onDragLeave={(e) => dragEnd(e)}
                onDragOver={(e) => dragStart(e)}
                onClick={(e) => inputRef.current.click()}
              >
                <div className={styles.dragDropContainerIcon}>
                  <FileDownloadOutlinedIcon sx={{ fontSize: "50px" }} />
                  <h4>
                    Переташите изображение или нажмите кнопки для загрузки
                  </h4>
                </div>
                <div className={styles.dragDropAdvice}>
                  Советуем использовать файлы высокого качества в формате
                  .jpg(размером меньше 5 мб)
                </div>
              </div>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => onSetFileHandler(e, e.target.files)}
              name="avatar"
              ref={inputRef}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        </div>
      </div>
      <div></div>
      {error.length === 0 ? (
        ""
      ) : (
        <Stack sx={{ width: "100%" }} spacing={1}>
          <Alert severity="error">
            <AlertTitle>Ошибка</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
}
