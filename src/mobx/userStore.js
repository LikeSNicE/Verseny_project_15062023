import { makeAutoObservable } from "mobx";
import AuthStore from "./authStore";
import UserService from "../services/userService";

export default class UserStore {
  constructor() {
    makeAutoObservable(this);
  }



  async updateDataUser(data,id) {
    const Authstore = new AuthStore();
    try {
      const response = await UserService.updateUserData(
        data,
        // Authstore.user.id
        id
      );
      Authstore.setUser(response.data);
      // this.Authstore.setUser(data.id)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }
}
