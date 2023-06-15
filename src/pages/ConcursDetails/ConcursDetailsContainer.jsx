import React, { useContext, useEffect } from "react";
import ConcursDetails from "./ConcursDetails";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import LoadingCustom from "../../Components/LoadingCustom/LoadingCustom";
import { convertContest } from "./ConcursDetailsData";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const ConcursDetailsContainer = () => {
  const {id} = useParams();
  const {Conteststore} = useContext(Context);
  const [isLoading,setIsLoading] = useState(true);
  const [contest,setContest] = useState({});
  useEffect(()=>{
    Conteststore.GetContest(id).then(responce => {
      console.log(convertContest(responce.contest))
      setContest(convertContest(responce.contest))
      setIsLoading(false)
    }).catch((e) => {
      console.log(e)
      setContest(false);
      setIsLoading(false)
    });
  },[id]);

  if(isLoading){
    return <LoadingCustom/>
  }
  if(!contest){
    return <NotFoundPage/>
  }
  return (<ConcursDetails {...contest} preview={false}  setContest={setContest}/>);
};

export default ConcursDetailsContainer;
