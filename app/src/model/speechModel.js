import { axiosPost } from "./axios";
const resources = "/speech"

export default {
  async post(pathTree) {
    const res = await axiosPost(resources, { pathTree: pathTree })
    return res;
  }
}