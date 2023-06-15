// import React, { useState, useRef } from "react";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import { Alert, AlertTitle, Stack } from "@mui/material";
// import { useEffect } from "react";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import './InputPoster.module.scss'
// import styles from './InputPoster.module.scss';

// export default function InputPoster({ getImage, defaultImage}) {
//   const checkImage = defaultImage !== undefined ? defaultImage : "";
//   const [drag, setDrag] = useState(false);
//   const [error, setError] = useState("");
//   const [image, setImage] = useState(checkImage);
//   const inputRef = useRef();
//   const [hover, isHover] = useState(false);
//   useEffect(() => {
//     getImage(image);
//     //eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [image]);

//   const dragStart = (e) => {
//     e.preventDefault();
//     setDrag(true);
//   };
//   const dragEnd = (e) => {
//     e.preventDefault();
//     setDrag(false);
//   };

//   const onClose = () => {
//     setDrag(false);
//     getImage("");
//     setImage("");
//   };
//   const hoverImage = (state) => {
//     switch (state) {
//       case "hover":
//         isHover(true);
//         break;
//       case "leave":
//         isHover(false);
//         break;
//       default:
//         isHover(false);
//     }
//   };
//   const onSetFileHandler = (e, avatar) => {
//     e.preventDefault();
//     const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

//     if (validExtensions.includes(avatar[0].type)) {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(avatar[0]);
//       fileReader.onload = () => {
//         setImage(fileReader.result);
//       };
//     } else {
//       setError("Данный файл не является фотографием!!");
//       setDrag(false);
//     }
//   };

//   if (image.length !== 0)
//     return (
//       <div className={styles.dragDropContainerGap}>
//         <div className={styles.containerImg}>
//           <img
//             src={image}
//             alt="img"
//             style={{ width: "1000px",height: '300px' }}
//             onMouseOver={() => hoverImage("hover")}
//           />
//           <div
//             className={hover ? "bgDelete" : ""}
//             onMouseLeave={() => hoverImage("leave")}
//           ></div>
//           <div
//             className={
//               hover
//                 ? styles.displayNone + " " + styles.buttonDeleteImgContainer
//                 : styles.displayNone
//             }
//           >
//             <div
//               className={styles.buttonDeleteImg}
//               onMouseOver={() => hoverImage("hover")}
//               onClick={onClose}
//             >
//               <DeleteOutlineIcon onMouseOver={() => hoverImage("hover")} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );

//   return (
//     <div style={{ display: "grid", gap: "20px" }}>
//       <div className={styles.dragDropBorder}>
//         <div className={styles.dragDropContainer}>
//           <div>
//             {drag ? (
//               <div
//                 className={styles.dragDropContainerGap}
//                 onDragStart={(e) => dragStart(e)}
//                 onDragLeave={(e) => dragEnd(e)}
//                 onDragOver={(e) => dragStart(e)}
//                 onDrop={(e) => onSetFileHandler(e, e.dataTransfer.files)}
//               >
//                 <div className={styles.dragDropContainerIcon}>
//                   <h4>Отпустите файлы, чтобы загрузить их</h4>
//                 </div>
//                 <div className={styles.dragDropAdvice}>
//                   Советуем использовать файлы высокого качества в формате
//                   .jpg(размером меньше 5 мб)
//                 </div>
//               </div>
//             ) : (
//               <div
//                 className={styles.dragDropContainerGap}
//                 onDragStart={(e) => dragStart(e)}
//                 onDragLeave={(e) => dragEnd(e)}
//                 onDragOver={(e) => dragStart(e)}
//                 onClick={(e) => inputRef.current.click()}
//               >
//                 <div className={styles.dragDropContainerIcon}>
//                   <FileDownloadOutlinedIcon sx={{ fontSize: "50px" }} />
//                   <h4>
//                     Переташите изображение или нажмите кнопки для загрузки
//                   </h4>
//                 </div>
//                 <div className={styles.dragDropAdvice}>
//                   Советуем использовать файлы высокого качества в формате
//                   .jpg(размером меньше 5 мб)
//                 </div>
//               </div>
//             )}
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={(e) => onSetFileHandler(e, e.target.files)}
//               name="avatar"
//               ref={inputRef}
//               accept="image/png, image/gif, image/jpeg"
//             />
//           </div>
//         </div>
//       </div>
//       <div></div>
//       {error.length === 0 ? (
//         ""
//       ) : (
//         <Stack sx={{ width: "100%" }} spacing={2}>
//           <Alert severity="error">
//             <AlertTitle>Ошибка</AlertTitle>
//             <strong>{error}</strong>
//           </Alert>
//         </Stack>
//       )}
//     </div>
//   );
// }


import React, { useState, useRef } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Alert, AlertTitle, Stack } from "@mui/material";
import "./InputPoster.scss";
import { useEffect } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function InputImageLook({ getImage, defaultImage, style }) {
  const checkImage = defaultImage !== undefined ? defaultImage : "";
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(checkImage);
  const inputRef = useRef();
  const [hover, setHover] = useState(false);
  useEffect(() => {
    getImage(image);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

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
    getImage("");
    setImage("");
  };
  // const hoverImage = (state) => {
  //   switch (state) {
  //     case "hover":
  //       isHover(true);
  //       break;
  //     case "leave":
  //       isHover(false);
  //       break;
  //     default:
  //       isHover(false);
  //   }
  // };
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

  if (image.length !== 0)
    return (
      <div style={{ paddingBottom: "40px" }}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="image-container"
        >
          <img
            src={image}
            alt="Your-img"
          />
          <div className={hover ? "image-container-under" : ""}></div>
          <button className="image-button" onClick={onClose}>
            <DeleteOutlinedIcon />
          </button>
        </div>
      </div>
    );

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <div className="dragDropBorder" style={style}>
        <div className="dragDropContainer">
          <div>
            {drag ? (
              <div
                className="dragDropContainerGap"
                onDragStart={(e) => dragStart(e)}
                onDragLeave={(e) => dragEnd(e)}
                onDragOver={(e) => dragStart(e)}
                onDrop={(e) => onSetFileHandler(e, e.dataTransfer.files)}
              >
                <div className="dragDropContainerIcon">
                  <h4>Отпустите файлы, чтобы загрузить их</h4>
                </div>
                <div className="dragDropAdvice">
                  Советуем использовать файлы высокого качества в формате
                  .jpg(размером меньше 5 мб)
                </div>
              </div>
            ) : (
              <div
                className="dragDropContainerGap"
                onDragStart={(e) => dragStart(e)}
                onDragLeave={(e) => dragEnd(e)}
                onDragOver={(e) => dragStart(e)}
                onClick={(e) => inputRef.current.click()}
              >
                <div className="dragDropContainerIcon">
                  <FileDownloadOutlinedIcon sx={{ fontSize: "50px" }} />
                  <h4>
                    Переташите изображение или нажмите кнопки для загрузки
                  </h4>
                </div>
                <div className="dragDropAdvice">
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
