import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import GetFileImg from "../GetFileImage/GetFileImage";
import AlertCustom from "../AlertCustom/AlertCustom";
import styles from './InputFile.module.scss';

export default function FileProgress({ file = [], setFile, progress = 0 }) {
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: "10px",
    width: "100%",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D9D9D9",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#7272D8",
    },
  }));
  const getFileSize = (bytes, decimalPoint) => {
    if (bytes === 0) return "0 Bytes";
    var k = 1000,
      dm = decimalPoint || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };
  const closeFile = (indexFile) => {
    setFile &&
      setFile(
        "files",
        file.filter((value, index) => index !== indexFile)
      );
  };
  if (progress === 100) {
    return <AlertCustom error={"Вы загрузили данный файл успешно!"} severity="success" />;
  }

  const fileOverflow = () => {
    if(file.length !== 0){
      return {
        maxHeight:'300px',
        height: '100%',
        overflow: 'auto',
        paddingRight: '10px',
        marginTop: '10px'
      }
    }
    return {};
  }


  return (
    <div style={fileOverflow()} className={styles.dragDropSection}>
      {file.map((value, index) => (
        <div className={styles.dragDropContainerGap} key={index}>
          <div className={styles.dragDropContainerBox} key={index}>
            <div className={styles.dragDropContainerFlex} key={index}>
              <GetFileImg
                type={value.name.split(".").pop()}
                style={{ width: "50px" }}
              />
              <div className={styles.fileUploadContainer}>
                <h4>{value.name}</h4>
                <p>{getFileSize(value.size, 2)}</p>
              </div>
              <div
                className={styles.fileUploadContainer}
                style={{ width: "100%" }}
              >
                <h4 style={{ textAlign: "right" }}>{progress}%</h4>
                <BorderLinearProgress variant="determinate" value={progress} />
              </div>
              <CloseIcon onClick={() => closeFile(index)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
