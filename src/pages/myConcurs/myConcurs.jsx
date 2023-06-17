import React,{useState,useEffect, useContext} from "react";
import styles from "./myConcurs.module.scss";
import TabsCustom from "../../Components/TabsCustom/TabsCustom";
import * as Muicon from "@mui/icons-material";
import FilterBlockCustom from "../../Components/FilterBlock/FilterBlock";
import { Grid} from "@mui/material";
import IconCustom from "../../Components/IconCustom/IconCustom";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import CardCustom from "../../Components/CardCutsom/CardCustom";
import { Context } from "../..";
import PendingConcurs from "./pendingConcurs/pendingConcurs";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";
import NotFoundContest from "../../Components/NotFoundContest/NotFoundContest";
import { Link } from "react-router-dom";

const   MyConcurs = () => {
  const AccessTimeOutlined = Muicon["AccessTimeOutlined"];
  const {Conteststore} = useContext(Context);
  const [contest,setContest] = useState([]);
  const [pendingContest,setPendingContest] = useState([]); 
  const [isLoading,setIsLoading] = useState(true);
  const DataTabs = [
    {
      id: 2,
      label: "Ожидаемые конкурсы",
      icon: <AccessTimeOutlined />,
      value: <PendingConcurs concurs={pendingContest}/>,
    },
  ];
  useEffect(() => {
    Conteststore.getPartipicationContest().then(res => {
      console.log(res.contest);
      setContest(res.contest);
      setPendingContest(findPendingContests(res.contest));
      setIsLoading(false)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const findPendingContests = (contest = []) =>{
   return contest.filter((item,index) => item[0].term.state === "Expectation");
  }
  const filterConcurs = (id) =>{
    setContest(Conteststore.filterContestByCategory(Conteststore.myPartipicationContests,id));
  }
  const sortContest = (callback) => {
    setContest(contest.sort(callback))
  }

  if(isLoading){
    return <LoadingCustom/>
  }
  return (
    <div className={styles.myconcurs}>
      <div className={styles.myconcursMain}>
        <div className={styles.myconcursMainInfo}>
          <TabsCustom dataTabs={DataTabs} />
        </div>
        <div className={styles.myconcursMainResult}>
          <div className={styles.myconcursMainResultFilter}>
            <FilterBlockCustom getTagButton={filterConcurs} getSort={sortContest}/>
          </div>
          <div className={styles.myconcursMainItems}>
            {
            contest.length === 0 ?    
            <NotFoundContest/>
            :
            contest.map((contestItem, index) => (
              contestItem.map((item) => (
              <CardCustom key={index} dataCard={item}>
                  <Grid spacing={0.5}>
                    <Link to={`/concurs-share/${item.concurs.id}`}>
                    <ButtonCustom
                      style={{ fontSize: "13px", width: "100%" }}
                      color="primary"
                      startIcon={<IconCustom icon={"PeopleAltOutlined"} />}
                    >
                      Просмотр учасников
                    </ButtonCustom>
                    </Link>
                  </Grid>
              </CardCustom>
              ))
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyConcurs;
