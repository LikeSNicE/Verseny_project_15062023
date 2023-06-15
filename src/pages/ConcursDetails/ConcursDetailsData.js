export const headData = ["Место", "Приз"];

export const convertContest = (data) =>{
  return {
    ...data,
    concurs:{
      ...data.concurs,
      json_winners: JSON.parse(data.concurs.json_winners)
    },
    author: {
      nickname: data.author.name,
      avatar: data.author.avatar,
      id: data.author.id
    }   
  }
}
