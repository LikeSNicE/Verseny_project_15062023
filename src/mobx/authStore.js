import { makeAutoObservable } from "mobx";
import FetchAuthService from "../services/fetchService";
import UserService from "../services/userService";
import ChannelService from "../services/channelService";

export default  class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  // state
  isAuth = false;
  isLoading = false;
  isLoadingButton = false;

  user = {
    avatar: "",
    name: "",
    nickname: "",
    id: "",
    channel_id: "",
    gender: "",
    description: "",
    header: "",
    created_at: "",
    email: "",
    subcribers: 0,
  };

  //actions
  setUser(user) {
    this.user = user;
  }

  setAuth(isAuth) {
    this.isAuth = isAuth;
  }
  // action async

  async login(formData) {
    this.isLoadingButton = true;
    try {
      const response = await FetchAuthService.login(formData);
      return {
        user: response.data.data,
        isAuth: true,
        message: "Авторизация прошла успешна",
      };
    } catch (error) {
      return {
        user: this.user,
        isAuth: false,
        message: "Неверная почта или пароль",
      };
    } finally {
      this.isLoadingButton = false;
    }
  }

  async logout() {
    this.isLoading = true;
    try {
      await FetchAuthService.logout();
      this.setUser({});
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  async register(formData) {
    try {
      const response = await FetchAuthService.signIn(formData);
      localStorage.setItem("token", response.data.data.access_token);
      this.setAuth(true);
      this.setUser(response.data.data.user);
    } catch (error) {
      console.log(error);

    }
  }

  async refresh() {
    this.isLoading = true;
    try {
      const response = await FetchAuthService.refresh();
      localStorage.setItem("token", response.data.data.access_token);
      this.setAuth(true);
      this.setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    } finally {
      this.isLoading = false;
    }
  }

  async forgotPassword(email) {
    this.isLoadingButton = true;
    try {
      await FetchAuthService.forgotPassword(email);
      return {
        error:"Мы на вашу почту дали инструкций восстановление. И вы будете переброшенны на странницу логина",
        severity:"success"
      }
    } catch (error) {
      return {
        error:"Был введен неправильный email",
        severity:"error"
      }
    } finally {
      this.isLoadingButton = false;
    }
  }

  async recognizeUserToToken(token) {
    this.isLoading = true;
    try {
      const response = await FetchAuthService.recognizeUserToToken(token);
      return {
        success: true,
        ...response.data,
      };
    } catch (error) {
      return {
        success: false,
        ...error.response.data,
      };
    } finally {
      this.isLoading = false;
    }
  }

  async resetPassword(data) {
    this.isLoadingButton = true;
    try {
      const responce = await FetchAuthService.resetPassword(data);
      return {
        error: responce.data.message,
        severity: "success"
      };
    } catch (error) {
      return {
        error: error.data.message,
        severity: "error"
      }
    }
    finally{
      this.isLoadingButton = false;
    }
  }

  // update photo

  async updatePhoto(formdata) {
    return await FetchAuthService.updatePhoto(this.user.id, formdata);
  }

  // users

  async updateDataUser(data, id) {
    try {
      const response = await UserService.updateUserData(data, id);
      this.setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // channels

  async updateDataChannel(data, id) {
    try {
      const response = await ChannelService.updateDataChannel(data, id);
      this.setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // contest 
  
}
