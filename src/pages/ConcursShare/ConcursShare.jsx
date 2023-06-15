import React, { useEffect, useState ,useContext} from "react";
import styles from "./ConcursShare.module.scss";
import SelectUI from "../../Components/Select/Select";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import { Link, useParams} from "react-router-dom";
import ConcursShareFiles from "./ConcursShareFiles/ConcursShareFiles";
import ConcursShareTop from "./ConcursShareTop/ConcursShareTop";
import * as Muicon from "@mui/icons-material";
import {arraySelectOption} from "../../Components/FilterBlock/FilterBlock";
import { Context } from "../..";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import IconCustom from "../../Components/IconCustom/IconCustom";

// component
const ConcursShare = () => {
  const EmojiEventsOutlinedIcon = Muicon["EmojiEventsOutlined"];
  const PeopleOutlinedIcon = Muicon["PeopleOutlined"];
  const {Partipicationstore} = useContext(Context);
  const {id} = useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [success,setSuccess] = useState(false);
  const [contest,setContest] = useState({});
  useEffect(()=>{
    Partipicationstore.getConcursShareFiles(id).then(res => {
      console.log(res)
      setContest(res);
      setSuccess(res.success);
      setIsLoading(false);
    })
  },[]);
  const filterFile = (call) =>{
    console.log(call)
  }
  if(isLoading){
    return <LoadingCustom/>
  }

  if(!success){
    return <NotFoundPage/>
  }
  // ui
  return (
    <div className={styles.result}>
      <ConcursShareTop contestData={contest.contest} />
      <div className={styles.member}>
        <div className={styles.memberContainerGrid}>
          <h3 className={styles.memberMainTitle}>Участники</h3>
          <h4 className={styles.memberTypeParticipation}>
            Тип участия :
            <IconCustom icon={contest.contest.concurs.type.icon}/>
            {contest.contest.concurs.type.text}
          </h4>
          <h4 className={styles.memberCount}>
            <PeopleOutlinedIcon sx={{ verticalAlign: "bottom" }} />
            {contest.contest.concurs.participant} Участников
          </h4>
        </div>
        <div className={styles.memberBox}>
          <div className={styles.memberBoxLeft}>
            <SelectUI
              option={arraySelectOption}
              getValue={filterFile}
              label={"Показать"}
            />
          </div>
          <div className={styles.memberBoxRight}>
            {contest.isYour && !contest.contest.concurs.isWinner ? 
            <Link to={`/concurs-winner/${id}`}>
              <ButtonCustom
                className={styles.memberBoxRightLinkChosenWinner}
                startIcon={<EmojiEventsOutlinedIcon />}
              >
                  Выбрать Победителя
              </ButtonCustom>
            </Link>
            : ""}
          </div>
        </div>
      
        <div className={styles.memberTabs}>
          <ConcursShareFiles fileData={contest.files}/>
        </div>
      </div>
    </div>
  );
};

export default ConcursShare;


// image 