import { axiosGet } from "./axios";
const resources = "/workspaces"

export default {
  async get() {
    const res = await axiosGet(`${resources}`)
    return res;
  },

  async getById(workspaceId) {
    const res = await axiosGet(`${resources}/${workspaceId}`)
    return res;
  }
}