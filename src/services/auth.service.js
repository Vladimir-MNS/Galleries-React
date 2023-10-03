import HttpService from "./http.service";

export default class AuthService {
  static async register(data) {
    return await HttpService.request({
      url: "/auth/register",
      method: "POST",
      data,
    });
  }
  static async login(data) {
    return await HttpService.request({
      url: "/auth/login",
      method: "POST",
      data,
    });
  }
  static async logout() {
    return await HttpService.request({
      url: "/auth/logout",
      method: "POST",
    });
  }
}