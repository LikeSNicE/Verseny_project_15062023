import Api from "../api/api";

export default class UserService {
  static async updateUserData(data, id) {
    return await Api.put(`users/${id}`, data);
  }
}
