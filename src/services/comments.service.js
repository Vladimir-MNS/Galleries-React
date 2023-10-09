import HttpService from "./http.service";

export default class Comments {
  
  static async create(data) {
    return await HttpService.request({
      url: "/comments",
      method: "POST",
      data,
    });
  }
  static async update(data, id) {
    return await HttpService.request({
      url: `/galleries/${id}`,
      method: "PUT",
      data,
    });
  }

  static async delete(id) {
    return await HttpService.request({
      url: `/comments/${id}`,
      method: "DELETE",
    });
  }

}