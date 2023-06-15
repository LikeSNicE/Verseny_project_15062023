import React,{useState} from "react";
import { Link } from "react-router-dom";
import styles from "./File.module.scss";
import { isFile } from "../isFileByUrl/isFileToUrl";
import ModalCustom from "../../../Components/Modal/Modal";
import FileModal from "./FileModal";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
export default function File({ data }) {
  const [open, setIsOpen] = useState(false);
  const [file,setFile] = useState("");
  const fileOpen = (path) =>{
    setFile(path);
    setIsOpen(true);
  }
  const fileMap = new Map([
    ["folder", "https://img.icons8.com/color/256/folder-invoices.png"],
    ["txt","https://img.icons8.com/external-others-iconmarket/256/external-txt-file-types-others-iconmarket-3.png",],
    ["css","https://img.icons8.com/external-others-iconmarket/256/external-css-file-types-others-iconmarket-3.png",],
    ["html","https://img.icons8.com/external-flat-juicy-fish/256/external-html-coding-and-development-flat-flat-juicy-fish.png",],
    ["undefined", "https://img.icons8.com/fluency/256/file.png"],
    ["mp4","https://img.icons8.com/external-fauzidea-flat-fauzidea/256/external-mp4-file-file-extension-fauzidea-flat-fauzidea.png",],
    ["mp3", "https://img.icons8.com/color/256/mp3.png"],
    ["png","https://cdn-icons-png.flaticon.com/128/337/337948.png"],
    ["jpg","https://sun9-76.userapi.com/impg/scjRHbw3bk4gg6SQU_mSsA9ki5tdESdbfzAF7g/PA0-seu7Gtg.jpg?size=512x512&quality=95&sign=99c1c6d608f90e3d43af3b786398cf43&type=album"]
  ]);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={fileMap.get(data.type)}
        className={styles.iconFile}
        alt={data.type}
      />
      <h3 className={styles.fileName}>
        {isFile(data.path) ? 
        <div onClick={()=>fileOpen(data.path)} className={styles.fileNameLink}>{data.name}</div>
        : <Link to={`/concurs-user/${data.path}`} className={styles.fileNameLink}>{data.name}</Link>}
      </h3>
      <ModalCustom
        iconTopSection={<InsertDriveFileOutlinedIcon />}
        TopSectiontext="Просмотр файлов"
        open={open}
        setIsOpen={setIsOpen}
        iconTopSectionStyles={styles.topIcon}
      >
        <FileModal path={file}/>
      </ModalCustom>
    </div>
  );
}
