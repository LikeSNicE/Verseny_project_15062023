import React, { useContext, useState } from 'react'
import FilterBlockCustom from '../../../Components/FilterBlock/FilterBlock';
import CardCustom from '../../../Components/CardCutsom/CardCustom';
import styles from "../Channel.module.scss";
import NotFoundContest from '../../../Components/NotFoundContest/NotFoundContest';
import { Context } from '../../..';

export default function Concurs({dataCard=[]}) {
    const [contest,setContest] = useState(dataCard);
    const fullContest = dataCard;
    const {Conteststore} = useContext(Context);
    const filterConcurs = (id) =>{
      setContest(Conteststore.filterContestByCategory(fullContest,id));
    }
    const sortConcurs = (callback) =>{
      setContest(contest.sort(callback));
    }
    if(contest.length === 0){
        return (
        <div>
            <FilterBlockCustom getSort={(callback) => sortConcurs(callback)} getTagButton={(id)=>filterConcurs(id)}/>
            <NotFoundContest/>
        </div>
        );
    }
    return (
        <div className={styles.sectionChannelConcurs}>
          <FilterBlockCustom  getSort={(value) => sortConcurs(value)} getTagButton={(id)=>filterConcurs(id)}/>
          <div className={styles.sectionChannelConcursInner}>
            {contest.map((item, index) => (
              <CardCustom key={index} dataCard={item}/>
            ))}
          </div>
        </div>
      );
}
