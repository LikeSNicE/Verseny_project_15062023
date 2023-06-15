import React, { useContext, useEffect, useState } from "react";
import styles from "./AllSubcriptions.module.scss";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SearchInputCustom from "../../Components/SeacrhInput/SearchInput";
import {Outlet, useParams} from "react-router-dom";
import AvatarCustom from "../../Components/AvatarCustom/AvatarCustom";
import { Context } from "../..";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";

const AllSubcriptions = () => {
  const {Channelstore} = useContext(Context);
  const [isLoading,setIsLoading] = useState(true);
  const {id} = useParams();
  useEffect(()=>{
    Channelstore.getMySubcribers().then(res => {
      setSubribers(res.mySubscribers);
      setIsLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const [subcribers, setSubribers] = useState([]);
  const searchSubcribe = (value) =>{
    let valueTrim = value.trim().toLowerCase();
    const filteredList = Channelstore.mySubscribers.filter(
      item => item.name.toLowerCase().trim().includes(valueTrim));
      setSubribers(filteredList);
  }
  return (
    <div className={styles.sectionSubscription}>
      <div className={styles.sectionSubscriptionList}>
        <div className={styles.sectionSubscriptionListTop}>
          <span>
            <SubscriptionsOutlinedIcon />
          </span>
          <div className={styles.sectionSubscriptionListTopTitle}>Подписки</div>
        </div>

        <div className={styles.sectionSubscriptionListSearch}>
          <SearchInputCustom label="Поиск" getValue={searchSubcribe} />
        </div>

        <div className={styles.sectionSubscriptionListChannels}>
          {isLoading ? <LoadingCustom/> : subcribers.map((item, index) => (
             <AvatarCustom data={item} active={item.id === Number(id)} key={index}/>
          ))}
        </div>
      </div>
      <div className={styles.sectionSubscriptionInfoChannel}>
        <Outlet/>   
      </div>
    </div>
  );
};

export default AllSubcriptions;