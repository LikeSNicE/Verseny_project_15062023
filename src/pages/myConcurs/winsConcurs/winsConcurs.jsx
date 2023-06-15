import React from "react";
import styles from "./winsConcurs.module.scss";
import AvatarCustom from "../../../Components/AvatarCustom/AvatarCustom";
import { Link } from "react-router-dom";

const DataAvatar = {
  name: "Ubisoft",
  link: "/channel/id",
  description: "bekkozha.ayan@mail.ru",
  avatar:
    "https://img5.goodfon.ru/wallpaper/nbig/f/6e/the-last-of-us-part-2-odni-iz-nas-elli-ellie-ps4-game-art.jpg",
};

const dataForWins = [
  {
    poster:
      "https://sun1-96.userapi.com/C8JROvbxlgJguZqdSFJqaieJR9hGDynU_Btadg/KLoQ-0g5c2A.jpg",
    description: "Конкурс открытки «Герои сказок А. С...",
  },
  {
    poster:
      "https://sun1-96.userapi.com/C8JROvbxlgJguZqdSFJqaieJR9hGDynU_Btadg/KLoQ-0g5c2A.jpg",
    description: "Конкурс открытки «Герои сказок А. С...",
  },
];

const WinsConcurs = () => {
  return (
    <>
      {dataForWins.map((item, index) => (
        <div key={index} className={styles.sectionWinCon}>
          <Link to={"/concurs/id"}>
            <div className={styles.sectionWinConImg}>
              <img src={item.poster} alt="win-concurs-poster" />
            </div>
          </Link>
          <div className={styles.sectionWinConFlex}>
            <div className={styles.sectionWinConFlexTitle}>
              {item.description}
            </div>
            <div className={styles.sectionWinConFlexAvatar}>
              <AvatarCustom data={DataAvatar} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WinsConcurs;
