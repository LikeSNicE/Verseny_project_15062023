import Api from "../api/api";

export default class ConcursService{
  static async AddContest(formData){
    return await Api.post('contests',formData)
  }
  
  static async GetCategoriesAndTypes(){
    return await Api.get('category')
  }

  static async GetMyContestChannel(){
    return await Api.get("myContests");
  }

  static async GetContest(id){
    return await Api.get(`contests/${id}`);
  }

  static async updateContest(id,formData){
    return await Api.post(`contests/${id}`,formData);
  }

  static async setParticipation(formData,onUploadProgress){
    return await Api.post("participations",formData,{onUploadProgress})
  }

  static async deleteContest(id){
    return await Api.delete(`contests/${id}`);
  }
  static async GetMyPartipication(){
    return await Api.get("myPartipication");
  }
  static async GetFilesPartipication(id){
    return await Api.get(`participations/${id}`);
  }
  static async GetConcursShareUserFiles(path){
    return await Api.get(`participations/user/file/${path}`)
  }
  static async GetFileContest(path){
    return await Api.get(`file/${path}`);
  }
  static async GetWinnersContest(id){
    return await Api.get(`contests/winners/${id}`);
  }
  static async SetWinnersContest(id,data){
    return await Api.put(`contests/winners/${id}`,data)
  }
  static async GetContestAll(){
    return await Api.get("contests");
  }
}