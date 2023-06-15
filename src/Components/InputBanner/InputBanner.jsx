import React, { useCallback, useState, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./createBanner";
import { Alert, AlertTitle, Stack, Grid, Slider } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import styles from './InputImage.module.scss';
import ButtonCustom from "../ButtonCustom/ButtonCustom";

export default function InputBanner({
  size,
  aspect,
  getImage,
  defaultImage,
  defaultCroppedImage,
}) {
  const checkImage = defaultImage !== undefined ? defaultImage : "";
  const checkCroppedImage =
    defaultCroppedImage !== undefined ? defaultCroppedImage : "";
  const [image, setImage] = useState(checkImage);
  const [cropImage, setCropImage] = useState(checkCroppedImage);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      getImage && getImage(croppedImage, image);
      setCropImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels, rotation, image]);

  const inputRef = useRef();

  const dragStart = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragEnd = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  const onClose = () => {
    setDrag(false);
    setImage("");
    setCropImage("");
  };

  const onRemake = () => {
    getImage("", image);
    setCropImage("");
  };

  const onSetFileHandler = (e, avatar) => {
    e.preventDefault();

    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(avatar[0].type)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(avatar[0]);
      fileReader.onload = () => {
        setImage(fileReader.result);
      };
    } else {
      setError("Данный файл не является фотографием!!");
      setDrag(false);
    }
  };

  if (cropImage.length !== 0)
    return (
      <div
        className={styles.dragDropContainerGap}
        style={{ width: size.width }}
      >
        <img src={cropImage} alt="cropImage" style={{ width: "100%" }} />
        <h4 style={{ color: "red" }}>Фотография была обрезано!</h4>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ButtonCustom
                variant="outlined"
                color="error"
                onClick={onClose}
                style={{ width: "100%" }}
              >
                Cбросить
              </ButtonCustom>
            </Grid>
            <Grid item xs={8}>
              <ButtonCustom
                color="primary"
                style={{ width: "100%" }}
                onClick={onRemake}
              >
                Переделать
              </ButtonCustom>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  if (image.length !== 0)
    return (
      <div
        className={styles.dragDropContainerGap}
        style={{ width: size.width }}
      >
        <Cropper
          minZoom={0.4}
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          restrictPosition={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            containerStyle: {
              width: "100%",
              height: size.height,
              position: "relative",
            },
          }}
        />
        <div className={styles.cropperSliderContainer}>
          <RotateRightIcon />
          <Slider
            defaultValue={0}
            sx={{ color: "#7272D8", height: 8 }}
            valueLabelDisplay="auto"
            onChange={(e) => setRotation(e.target.value * 3.6)}
          />
        </div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ButtonCustom
                variant="outlined"
                color="error"
                onClick={onClose}
                style={{ width: "100%" }}
              >
                Cбросить
              </ButtonCustom>
            </Grid>
            <Grid item xs={8}>
              <ButtonCustom
                color="primary"
                onClick={showCroppedImage}
                style={{ width: "100%" }}
              >
                Обрезать
              </ButtonCustom>
            </Grid>
          </Grid>
        </div>
      </div>
    );

  return (
    <div className={styles.dragDropContainerGap}>
      <div className={styles.dragDropBorder}>
        <div className={styles.dragDropContainer}>
          <div style={{ ...size, display: "grid", alignItems: "center" }}>
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
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Ошибка</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
}
