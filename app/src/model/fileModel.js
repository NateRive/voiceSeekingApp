import { axiosGet } from "./axios";
const resources = "/files"

export default {
  async get(path) {
    const query = { path: path }
    const res = await axiosGet(resources, query)
    return res;
  }
}