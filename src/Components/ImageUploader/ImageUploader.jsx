import React, { useState, useRef,useContext } from "react";
import styles from "./ImageUploader.module.scss";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Alert, AlertTitle, Stack } from "@mui/material";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { useForm } from "react-hook-form";
import { Context } from "../..";
import { observer } from "mobx-react-lite";


const ImageUploader = () => {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const inputRef = useRef();

  const handleDragStart = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDrop = (e, avatar) => {
    e.preventDefault();
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(avatar[0].type)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(avatar[0]);
      fileReader.onload = () => {
        setImage(fileReader.result);
        setError("")
      };
    } else {
      setError("Данный файл не является фотографием!!");
      setDrag(false);
    }
  };

  function handleRemoveImage() {
    setImage("");
    setDrag(false);
    setError("")
  }

  const handleAddImage = (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

    const { setValue, handleSubmit } = useForm();
    const { Authstore } = useContext(Context);

    const onSubmit = (data) => {
      const formdata = new FormData();
      for (let prop in data) {
        formdata.append(prop, data[prop]);
      }
      try {
        const response = Authstore.updatePhoto(formdata);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

  // Верстка DoneUpload
  if (image.length !== 0) {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.imagePreview}>
            <img onChange={handleAddImage} src={image} alt="preview" />

            <div className={styles.imagePreviewBoxBtns}>
              <ButtonCustom type="submit">Загрузить</ButtonCustom>
              <ButtonCustom onClick={handleRemoveImage}>Отменить</ButtonCustom>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <div>
            {drag ? (
              <div
                onDragStart={(e) => handleDragStart(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDragOver={(e) => handleDragStart(e)}
                onClick={(e) => inputRef.current.click()}
                onChange={handleAddImage}
                className={styles.dropZone}
                onDrop={(e) => handleDrop(e, e.dataTransfer.files)}
              >
                <h1 className={styles.dropZoneTitle}>
                  <div className={styles.dropZoneIcon}>
                    <FileDownloadOutlinedIcon />
                  </div>
                  Перетащите изображение
                  <br />
                  или
                  <br />
                  Нажмите кнопку для загрузки
                </h1>
                <h4 className={styles.dropZoneSubtitle}>
                  Советуем использовать файлы размера от 1200 X 270 в формате
                  JPG, для лучшего качества изображения
                </h4>
              </div>
            ) : (
              <div
                onDragStart={(e) => handleDragStart(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDragOver={(e) => handleDragStart(e)}
                onClick={(e) => inputRef.current.click()}
                onChange={handleAddImage}
                className={styles.dropZone}
                onDrop={(e) => handleDrop(e, e.dataTransfer.files)}
              >
                <h1 className={styles.dropZoneTitle}>
                  <div className={styles.dropZoneIcon}>
                    <FileDownloadOutlinedIcon />
                  </div>
                  Перетащите изображение
                  <br />
                  или
                  <br />
                  Нажмите кнопку для загрузки
                </h1>
                <h4 className={styles.dropZoneSubtitle}>
                  Советуем использовать файлы размера от 1200 X 270 в формате
                  JPG, для лучшего качества изображения
                </h4>
              </div>
            )}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleDrop(e, e.target.files)}
              name="avatar"
              ref={inputRef}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        </div>
      </div>
      {error.length === 0 ? (
        ""
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Ошибка</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
};

export default observer(ImageUploader);
