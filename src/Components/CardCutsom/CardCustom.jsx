import React from "react";
import CardTopSection from "./CardTopSection/CardTopSection";
import styles from "./CardCustom.module.scss";
import AvatarCustom from "../AvatarCustom/AvatarCustom";
import { ReactComponent as People } from "../../assets/images/icons/people.svg";
import IconCustom from "../IconCustom/IconCustom";
import { Link } from "react-router-dom";
import TagScience from "../TagScience/tagScience";

export default function CardCustom({ dataCard, children }) {

  return (
    <div className={styles.containerCard}>
      <CardTopSection data={dataCard} />
      <img
        src={dataCard.concurs.img}
        alt={dataCard.concurs.name}
        style={{ objectFit: "cover" }}
        height="170px"
        width="100%"
      />
      <div className={styles.blockCard + " " + styles.blockBoxShadow}>
        <Link className={styles.linkText} to={`/concurs/${dataCard.concurs.id}`}>
          <h4 className={styles.textCard}>{dataCard.concurs.name}</h4>
        </Link>
          <AvatarCustom
            data={{...dataCard.author,link:`/channel/${dataCard.author.id}`}}
            sizeAvatar={{ width: "30px", height: "30px" }}
            fontSize={{ name: "16px", description: "13px" }}
          />
        <div style={{ width: "100%", overflow: "hidden" }}>
          <h4 className={styles.textTypeCard + " " + styles.textOverflow}>
            Тип участия:
            <IconCustom icon={dataCard.concurs.type.icon} />{" "}
            {dataCard.concurs.type.text}
          </h4>
        </div>
        <div className={styles.containerCardFlex}>
          <TagScience backgroundColor={dataCard.concurs.category.color}>
            {dataCard.concurs.category.name}
          </TagScience>
          <div className={styles.containerPeopleFlex}>
            <People />
            <h4>{dataCard.concurs.participant}</h4>
          </div>
        </div>
        <div>
         {children}
        </div>
      </div>
    </div>
  );
}

