import { axiosGet } from "./axios";
const resources = "/word"

export default {
  async get(fileId) {
    const res = await axiosGet(`${resources}/${fileId}`)
    return res;
  }
}