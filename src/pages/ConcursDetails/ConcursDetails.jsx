import PropTypes from "prop-types";
import React from "react";
import TabsCustom from "../../Components/TabsCustom/TabsCustom";
import TagScience from "../../Components/TagScience/tagScience";
import styles from "./ConcursDetails.module.scss";
import AvatarCustom from "../../Components/AvatarCustom/AvatarCustom";
import ButtonSubcribers from "../../Components/ButtonSubcribers/ButtonSubcribers";
import TableBlock from "./TableBlock/TableBlock";
import FeaturesBlock from "./FeaturesBlock/FeaturesBlock";
import * as Muicon from "@mui/icons-material";
import ModalParticipate from "../../Components/ModalComponents/ParticipateModal/ParticipateModal";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import IconCustom from "../../Components/IconCustom/IconCustom";

const ConcursDetails = (props) => {
  
  const {concurs,author,preview,setContest} = props;
  
  const {
    img,
    name,
    category,
    start_contest,
    end_contest,
    participant,
    description,
    type,
    conditionals,
    json_winners,
    isParticipation,
    isSubcribers
  } = concurs;

  const {
    avatar,
    nickname,
    id
  } = author;

 

  const DataAvatar = {
    name: nickname,
    link: `/channel/${id}`,
    avatar: avatar,
  };

  const DataTabs = [
    {
      id: 1,
      label: "Призы конкурса",
      value: <TableBlock json_winners={json_winners} />,
    },
    {
      id: 2,
      label: "Условия конкурса",
      value: <FeaturesBlock text={conditionals} />,
    },
  ];

  const PeopleIcon = Muicon["PeopleOutlined"];

  return (
    <div className={styles.concursDetailsSection}>
      <div className={styles.concursDetailsSectionPoster}>
        <img src={img} alt="Poster Main" />
      </div>

      <div className={styles.concursDetailsSectionBoxTitles}>
        <div className={styles.concursDetailsSectionTitleMain}>{name}</div>
        <div className={styles.concursDetailsSectionTab}>
          <TagScience backgroundColor={category.color} children={category.name} />
        </div>
      </div>

      <div className={styles.concursDetailsSectionDate}>
        <h1 className={styles.concursDetailsSectionDateTitle}>
          Дата начало - конец :
        </h1>
        <h3 className={styles.concursDetailsSectionDateSubtitle}>
          {start_contest} - {end_contest}
        </h3>
      </div>

      <div className={styles.concursDetailsSectionParticipate}>
        <div className={styles.concursDetailsSectionParticipateGroup}>
          <PeopleIcon />
          <p>{participant} участников</p>
        </div>
        <div>
          {isParticipation ? 
          <h4 style={{color: "#e8533f"}}>
            Вы участвуете данном конкурсе
          </h4>
          : 
          <div className={styles.concursDetailsSectionBoxParticipateGroup}>
          {preview ? 
          <ButtonCustom startIcon={<IconCustom icon={type.icon}/>}>Участвовать</ButtonCustom> : 
          <ModalParticipate 
            setContest ={setContest}
            participation={type} 
            isParticipation={isParticipation} 
            contest ={props}
          />}
          </div>
          }
        </div>
      </div>

      <h1 className={styles.concursDetailsSectionOrganizer}>Организатор</h1>

      <div className={styles.concursDetailsSectionBoxAuthor}>
        <div className={styles.concursDetailsSectionBoxAuthorLeft}>
          <AvatarCustom data={DataAvatar} />
        </div>
        {preview ? (
          ""
        ) : (
          <div className={styles.concursDetailsSectionBoxAuthorRight}>
            <ButtonSubcribers 
              isSubcribers={isSubcribers}
              channel_id={id}
             />
          </div>
        )}
      </div>

      <div className={styles.concursDetailsSectionDescription}>
        <h3 className={styles.concursDetailsSectionDescriptionTitle}>
          Описание конкурса :
        </h3>
        <p className={styles.concursDetailsSectionDescriptionText}>
          {description}
        </p>
      </div>

      <div className={styles.concursDetailsSectionNav}>
        <TabsCustom dataTabs={DataTabs} />
      </div>
    </div>
  );
};
export default ConcursDetails;

ConcursDetails.propTypes = {
  posterMain: PropTypes.string,
  titleMain: PropTypes.string,
  tabText: PropTypes.string,
  dataStartNumber: PropTypes.string,
  dataEndNumber: PropTypes.string,
  authorName: PropTypes.string,
  authorPhoto: PropTypes.string,
  countUser: PropTypes.number,
  authorCountOfSubscribers: PropTypes.number,
  descriptionText: PropTypes.string,
};
