import { useState, useRef } from "react";
import styles from "./testPages.module.scss";
import InputPoster from "../../Components/InputPoster/InputPoster";
import CategoryContest from "../../Components/CategoryContest/CategoryContest";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./testPages.scss";
import { DirtyLensOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

const TestPages = () => {
  const [hover, setHover] = useState(false);

  const category = [
    {
      color: "#E8533F",
      name: "Точные науки",
      value: "1",
    },
    {
      color: "#5B6AB0",
      name: "Программирования",
      value: "2",
    },
  ];

  return (
    // <div style={{ paddingBottom: "40px" }}>
    //   <div
    //     onMouseEnter={() => setHover(true)}
    //     onMouseLeave={() => setHover(false)}
    //     className="image-container"
    //   >
    //     <img
    //       src="https://football-fun-live.com/uploads/42/posts/bavariyajpeg.jpeg"
    //       alt="Your-img"
    //     />
    //     <div className={hover ? "image-container-under" : ""}></div>
    //     <button className="image-button">
    //       <DeleteOutlinedIcon />
    //     </button>
    //   </div>
    // </div>
    <InputPoster getImage={() => ''}  />
  );
};

export default TestPages;
