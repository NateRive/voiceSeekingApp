import { axiosGet } from "./axios";
const resources = "/file"

export default {
  async get(path) {
    const query = { path: path }
    const res = await axiosGet(resources, query)
    return res;
  }
}