import { Context } from "../../../..";
import { useContext } from "react";
import {toJS} from 'mobx'
export const headData = ["Место", "Приз"];

export const dataTable = [
  [
    {
      PlaceIcon: "1",
    },
    {
      TextField: {
        label: "Введите приз",
        register: "",
      },
    },
  ],
];

export const ConvertDataConcurs = (data) =>{
  let options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  let startDate = new Date(data.start_contest);
  let endDate = new Date(data.end_contest);
  const {Conteststore,Authstore} = useContext(Context);
  return {
    concurs: {
      id: data.id ? data.id : 1,
      img: data.img,
      name: data.name,
      category: Conteststore.categories.filter(
        (category) => category.value === data.category_id
      )[0],
      start_contest: startDate.toLocaleDateString("ru-RU", options),
      end_contest: endDate.toLocaleDateString("ru-RU", options),
      participant: data.participant ? data.participant : 0,
      description: data.description,
      type: toJS(Conteststore.typesOfContest.filter(
        (type) => type.value === data.type_contest_id ? data.type_contest_id : 1
      )[0]),
      folder_contest: data.folder_contest ? data.folder_contest : "",
      conditionals: data.conditionals,
      json_winners: GetJsonWinners(data, data.value, true),
      isParticipation: data.isParticipation ? data.isParticipation : false,
    },
    author: {
      avatar: Authstore.user.avatar,
      nickname: Authstore.user.nickname,
    },
  };
}

export const GetJsonWinners = (data, getOnlyJsonWinners = false) => {
  let a = [];
  for (let prop in data) {
    if (prop.split("_")[0] === "prizes") {
      if (data[prop] !== null) {
        a.push([{ PlaceIcon: prop.split("_")[1] }, data[prop]]);
      }
      delete data[prop];
    }
  }
  if (getOnlyJsonWinners) {
    return a;
  }
  return {
    ...data,
    json_winners: JSON.stringify(a),
  };
}

const propsArray = [
  "img",
  "category_id",
  "description",
  "type_contest_id",
  "conditionals",
]; 

export const validProps = (value) =>{
  for(let prop in value){
    if(value[prop].length === 0){
      if(propsArray.includes(prop)){
        return false
      }
    }
  }
  return true;
}