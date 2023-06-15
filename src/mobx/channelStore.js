import { makeAutoObservable } from "mobx";
import ChannelService from "../services/channelService";

export default class ChannelStore{
  constructor() {
    makeAutoObservable(this);
  }
  contestChannel = {};
  mySubscribers = [];

  setContestChannel(contestChannel){
    this.contestChannel = contestChannel;
  }
  setMySubcribers(mySubscribers){
    this.mySubscribers = mySubscribers;
  }

  async getChannel(id){
    try {
        const responce = await ChannelService.getDataChannel(id);
        this.setContestChannel(responce.data.data.contest);
        return responce.data.data;
    } catch (error) {
        console.log(error);
        return {};
    }
  }

  async subcribe(id){
    try {
        const responce = await ChannelService.subcribe(id)
        return {
            message:responce.data.message,
            open:true,
            subcribers: responce.data.subcribers,
            isSubscribed:responce.data.isSubscribed,
            severity: responce.data.isSubscribed ? "success" : "error"
        }
    } catch (error) {
        return {
            message:"Извините,что то пошло не так",
            open:true,
            subcribers: 0,
            isSubscribed:false,
            severity: "error"
        }
    }
  }

  async getMySubcribers(){
    try{
      const responce = await ChannelService.getMySubcribers();
      this.setMySubcribers(responce.data.data);
      return {
        success:true,
        mySubscribers:responce.data.data
      };
    }catch(error){
      console.log(error);
      return {
        success:true,
        mySubscribers:[]
      }
    }
  }
}