import { axiosGet } from "./axios";
const resources = "/word"

export default {
  async get(audioId) {
    const res = await axiosGet(`${resources}/${audioId}`)
    return res;
  }
}