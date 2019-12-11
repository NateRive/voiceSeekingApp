import { axiosGet } from "./axios";
const resources = "/audios"

export default {
    async get(pageId) {
        const res = await axiosGet(`pages/${pageId}${resources}`)
        return res;
    }
}