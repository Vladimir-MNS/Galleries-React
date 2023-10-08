import HttpService from "./http.service";

export default class Galleries {
  static async getAll(take = 10, skip = 0, field = "", query = "") {
    return await HttpService.request({
      url: "/galleries",
      method: "GET",
      params: { take, skip, field, query },
    });
  }
  static async get(id) {
    return await HttpService.request({
      url: `/galleries/${id}`,
      method: "GET",
    });
  }
  static async create(data) {
    return await HttpService.request({
      url: "/galleries",
      method: "POST",
      data,
    });
  }
  static async update(id, data) {
    return await HttpService.request({
      url: `/galleries/${id}`,
      method: "PUT",
      data,
    });
  }
}