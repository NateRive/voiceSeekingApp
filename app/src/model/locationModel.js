import { axiosGet } from "./axios";
const resources = "/location"

export default {
    async get() {
        const res = await axiosGet(resources)
        return res;
    }
}