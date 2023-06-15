import React, { useState, useRef } from "react";
import styles from "./InputFile.module.scss";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AlertCustom from "../AlertCustom/AlertCustom";

export default function InputFile({ multiple = false, accept = "", getFile }) {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();

  const dragStart = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragEnd = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onSetFileHandler = (e, avatar) => {
    e.preventDefault();
    const validExtensions = accept;
    multiple
      ? setMultipleFile(avatar, validExtensions)
      : setOneFile(avatar, validExtensions);
  };
  const setOneFile = (avatar, valid) => {
    if (avatar.length > 1) {
      setDrag(false);
      setError(`Вы загрузили файлов более ${avatar.length} раза, а надо 1!`);
      return;
    }
   if(valid.length !== 0){
    if (!valid.includes(avatar[0].type)) {
      setDrag(false);
      setError("Данный файл не соответствует к загрузке!");
      return;
    }
   }
    getFile(avatar);
    setError("");
    setDrag(false);
  };
  const setMultipleFile = (avatars, valid) => {
    for (let i = 0; i < avatars.length; i++) {
      if(valid.length !== 0){
        if (!valid.includes(avatars[i].type)) {
          setDrag(false);
          setError("Данный файл не соответствует к загрузке!");
          return;
        }
      }
    }
    getFile(avatars);
    setError("");
    setDrag(false);
  };
  return (
    <div style={{ display: "grid", gap: "20px" }}>
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
                  <FileDownloadOutlinedIcon sx={{ fontSize: "50px" }} />
                  <h4>Отпустите файлы, чтобы загрузить их</h4>
                </div>
                <div className={styles.dragDropAdvice}>
                  Вы можете отправить{" "}
                  {multiple ? "множество файлов" : "только один файл"}
                </div>
              </div>
            ) : (
              <div
                className={styles.dragDropContainerGap}
                onDragStart={(e) => dragStart(e)}
                onDragLeave={(e) => dragEnd(e)}
                onDragOver={(e) => dragStart(e)}
                onClick={() => inputRef.current.click()}
              >
                <div className={styles.dragDropContainerIcon}>
                  <FileDownloadOutlinedIcon sx={{ fontSize: "50px" }} />
                  <h4>
                    Перетащите файл или нажмите на кнопку для загрузки файлов
                  </h4>
                </div>
                <div className={styles.dragDropAdvice}>
                  Советуем использовать файлы не больше 10 мб!
                </div>
              </div>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              multiple={multiple}
              onChange={(e) => onSetFileHandler(e, e.target.files)}
              name="avatar"
              ref={inputRef}
              accept={accept}
            />

          </div>
        </div>
      </div>
      
      {error.length === 0 ? (
        ""
      ) : (
        <AlertCustom error={error} setError={setError} />
      )}
    </div>
  );
}
