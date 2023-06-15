import { GetJsonWinners } from "../../create/pages/prizesDataTable";

export const headData = ["Место", "Приз"];

export const tabCustom = [
    {
      to:"main",
      children:"Основная страница"
    },
    {
      to:"description",
      children:"Описание"
    },
    {
      to:"prizes",
      children:"Призы"
    },
    {
      to:"condition",
      children:"Условия"
    }
  ];

export const convertDataUpdate = (data) => {
   delete data.isParticipation;
   delete data.folder_contest;
   delete data.id;
   delete data.participant;
   delete data.type;
    return {
        ...data,
        start_contest:convertDate(data.start_contest),
        end_contest:convertDate(data.end_contest),
        category_id:data.category.id,
        ...convertJsonWinners(data.json_winners)
    }
}

const convertDate = (date) =>{
    let arrayDate = date.split('.');
    let mouth = arrayDate[1];
    let day = arrayDate[0];
    let year = arrayDate[2];
    return `${year}-${mouth}-${day}`;
} 

const convertJsonWinners = (json) =>{
  const JsonWinners = JSON.parse(json);
  let obj = {};
  obj["count"] = JsonWinners.length;
  for(let i = 0; i < JsonWinners.length;i++){
    obj[`prizes_${JsonWinners[i][0].PlaceIcon}`] = JsonWinners[i][1]
  }
  return obj;
}

export const filterFormData = (data)=>{
  delete data.category;
  delete data.count;
  delete data.json_winners;
  return GetJsonWinners(data);
}