import Api from "../api/api";

export default class ChannelService{
  static async updateDataChannel(data,id){
     return await Api.put(`channels/${id}`, data);
  }
  static async getDataChannel(id){
    return await Api.get(`channels/${id}`);
  }
  static async subcribe(id){
    return await Api.put(`subscribe/${id}`);
  }
  static async getMySubcribers(){
    return await Api.get('mySubscribers');
  }
}