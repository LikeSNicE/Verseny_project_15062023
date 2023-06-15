import React, { useContext, useEffect, useState } from "react";
import styles from "./Channel.module.scss";
import { Avatar } from "@mui/material";
import TabsCustom from "../../Components/TabsCustom/TabsCustom";
import * as Muicon from "@mui/icons-material";
import Concurs from "./Tabs/Concurs";
import { Context } from "../..";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ButtonSubcribers from "../../Components/ButtonSubcribers/ButtonSubcribers";

const Channel = () => {
  const VersenyLogo = Muicon['CampaignOutlined'];
  const ListFeautes = Muicon["ListAltOutlined"];
  const {Channelstore} = useContext(Context);
  const [isLoading,setIsLoading] = useState(true);
  const [channel,setChannel] = useState({});
  const {id} = useParams();
  useEffect(()=>{
    Channelstore.getChannel(id).then(responce =>{
      setChannel(responce);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);
  if(isLoading){
    return <LoadingCustom/>
  }

  if(channel.length === 0){
    return <NotFoundPage/>
  }
  const DataTabs = [
    {
      id: 1,
      label: 'Конкурсы',
      value: <Concurs dataCard={channel.contest}/>,
      icon: <VersenyLogo/>
    },
    {
      id: 2,
      label: "Подробности",
      value: channel.description,
      icon: <ListFeautes/>
    }
  ]

  return (
    <div className={styles.sectionChannel}>
      <img
        className={styles.sectionChannelPoster}
        src={channel.header}
        alt="header"
      />
      <div className={styles.sectionChannelInfo}>
        <div className={styles.sectionChannelInfoTop}>
          <div className={styles.sectionChannelInfoProfile}>
            <Avatar
              className={styles.sectionChannelInfoProfileImg}
              src={channel.avatar}
              alt={channel.nickname}
            />
            <div className={styles.sectionChannelInfoProfileData}>
              <p className={styles.sectionChannelInfoProfileDataCompany}>
                {channel.nickname}
              </p>
              <p
                className={styles.sectionChannelInfoProfileDataAmountSubcribers}
              >
                {channel.subcribers} подписчиков
              </p>
            </div>
          </div>
          <div className={styles.sectionChannelInfoRightBlock}>
            <ButtonSubcribers
              channel_id={channel.channel_id}
              isSubcribers={channel.isSubscribed}
              channel={channel}
              setChannel={setChannel}
            />
          </div>
        </div>

        <div className={styles.sectionChannelInfoBottom}>
          <TabsCustom dataTabs={DataTabs} />
        </div>
      </div>
    </div>
  );
};

export default Channel;
