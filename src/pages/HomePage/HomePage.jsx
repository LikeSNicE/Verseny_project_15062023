import React, { useContext, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import FilterBlockCustom from "../../Components/FilterBlock/FilterBlock";
import SearchInputCustom from "../../Components/SeacrhInput/SearchInput";
import CardCustom from "../../Components/CardCutsom/CardCustom";
import { Context } from "../..";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import NotFoundContest from "../../Components/NotFoundContest/NotFoundContest";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";

const HomePage = () => {
  const [contest,setContest] = useState([]);
  const {Conteststore} = useContext(Context);
  const [isLoading,setIsLoading] = useState(true);
  const [isSuccess,setIsSuccess] = useState(false);
  useEffect(() =>{
    Conteststore.getContestAll().then((res) => {
      setContest(res.contest);
      setIsSuccess(res.success);
      setIsLoading(false);
    });
  },[]);
  const filterConcurs = (id) =>{
    setContest(Conteststore.filterContestByCategory(Conteststore.contest,id));
  }
  const sortConcurs = (callback) =>{
    let data = contest.sort(callback)
    setContest(data.map(item => item));
  }
  const searchConcurs = (value) =>{
    let valueTrim = value.trim().toLowerCase();
    const filteredList = Conteststore.contest.filter(item => item.concurs.name.toLowerCase().trim().includes(valueTrim));
    setContest(filteredList);
  }
  if(isLoading){
    return <LoadingCustom/>
  }
  if(!isSuccess){
    return <NotFoundPage/>
  }
  return (
    <div className={styles.sectionHomePage}>
      <div className={styles.sectionHomePageTitle}>Главная</div>
      <div className={styles.sectionHomePageSearchInput}>
        <SearchInputCustom label="Найдется все" getValue={searchConcurs} />
      </div>
      <FilterBlockCustom getSort={sortConcurs} getTagButton={filterConcurs}/>

      <div className={styles.sectionHomePageInner}>
        {
          contest.length === 0 ? <NotFoundContest/>:
        contest.map((item, index) => (
          <CardCustom role={"admin"} key={index} dataCard={item}></CardCustom>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
