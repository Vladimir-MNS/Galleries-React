import axios from "axios";

export default class HttpService {
  static #api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 5000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static async request({ url, method, params, data, headers }) {
    const token = localStorage.getItem("token");
    return await this.#api.request({
      url,
      method,
      params,
      data,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}