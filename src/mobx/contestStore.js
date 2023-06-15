import { makeAutoObservable } from "mobx";
import ConcursService from "../services/concursService";
// import { isBase64 } from "../services/fileService";
import appendForm from "../services/formService";

export default class ContestStore{
  constructor() {
    makeAutoObservable(this);
  }

  // state
  isLoadingButton = false;

  categories = [];

  typesOfContest = [];

  contest = [];

  myContests = [];
  
  myPartipicationContests = [];
  // action

  setContest(contest){
    this.contest = contest
  }
  setMyContests(myContests){
    this.myContests = myContests;
  }

  setCategories(category){
     this.categories = category;
  }

  setTypeContest(typesContest){
    this.typesOfContest = typesContest;
  }

  setMyPartipicationContests(myPartipicationContests){
    this.myPartipicationContests = myPartipicationContests;
  }

  filterContestByCategory(fullContests,category_id){
    if(category_id === ""){
      return fullContests;
    }
    return fullContests.filter(item => item.concurs.category.id === Number(category_id));
  }
  //async action

  async GetCategoriesAndTypes(){
    const response = await ConcursService.GetCategoriesAndTypes();
    this.setCategories(response.data.categories);
    this.setTypeContest(response.data.types);
    return response.data;
  }

  async AddContest(data) {
    this.isLoadingButton = true;
    try{
      const formData = new FormData();
      appendForm(formData,data)
      await ConcursService.AddContest(formData);
      return {
        success:true
      }
    }
    catch(e){
      console.log(e)
      return {
        success:false
      }
    }finally{
      this.isLoadingButton = false;
    }
  }

  async GetMyContestChannel(){
    try{
      const responce = await ConcursService.GetMyContestChannel();
      this.setMyContests(responce.data.contests);
      return {
        contests: responce.data.contests
      }
    }catch(e){
      console.log(e);
    }
  }

  async GetContest(id){
    try{
      const responce = await ConcursService.GetContest(id);
      return {
        contest: responce.data.data
      }
    }catch(e){
      console.log(e);
    }
  }

  async updateContest(id,data){
    this.isLoadingButton = true;
    try{
      const formData = new FormData();
      appendForm(formData,data)
      await ConcursService.updateContest(id,formData);
      return {
        severity:"success",
        error:"Вы успешно изменили конкурс"
      };
    }catch(e){
      console.log(e);
      return {
        severity:"error",
        error:"Извините что то пошло не так"
      }
    }finally{
      this.isLoadingButton = false;
    }
  }

  async deleteContest(id){
    try {
       const responce = await ConcursService.deleteContest(id);
       return {
        severity:"success",
        error:"Вы успешно удалили конкурс",
        contest: responce.data.contests
       };
    } catch (error) {
      console.log(error);
      return {
        contest: [],
        severity:"error",
        error:"Извините что то пошло не так"
      }
    }
  }

  async getPartipicationContest(){
    try {
      const responce = await ConcursService.GetMyPartipication();
      this.setMyPartipicationContests(responce.data.contests);
      return {
        contest:responce.data.contests
      }
    } catch (error) {
      console.log(error);
      return{
        contest:[]
      }
    }
  }
  async getContestAll() {
    try {
      const responce = await ConcursService.GetContestAll();
      this.setContest(responce.data.data);
      return {
        contest:responce.data.data,
        success:true
      }
    } catch (error) {
      console.log(error);
      return {
        contest: [],
        success:false
      }
    }
  }
}