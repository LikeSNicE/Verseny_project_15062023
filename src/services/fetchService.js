import Api from "../api/api";

export default class FetchService {
  // auth
  static async login(value) {
    return await Api.post("login", value);
  }
  static async logout() {
    return await Api.delete("logout");
  }

  static async signIn(value) {
    return await Api.post("register", value);
  }

  static async sendMail(emailParams) {
    let result = {};
    await Api.get("email/generate/code", { params: { email: emailParams } })
      .then(() => {
        result.success = true;
      })
      .catch((response) => {
        console.log(response);
        result.success = false;
      })
      .finally(() => {
        result.isLoading = false;
        result.email = emailParams;
      });

    return result;
  }

  static async refresh() {
    return Api.get("refresh");
  }

  static async forgotPassword(paramsEmail) {
    return Api.get("email/generate/reset", { params: { email: paramsEmail } });
  }

  static async recognizeUserToToken(token){
    return Api.get(`reset/${token}`)
  }

  static async resetPassword(data){
    return Api.put('/reset',data)
  }

  // update photo 
  static async updatePhoto(id,formdata){
    return Api.post(`/channels/file/${id}`, formdata);
  }

}
