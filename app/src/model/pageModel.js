import { axiosGet, axiosPost } from "./axios";
const resources = "/pages"

export default {
    async getByParentId(parentId) {
        const res = await axiosGet(`${resources}/parent/${parentId}`)
        return res;
    },

    async getPageDetail(pageId) {
        const res = await axiosGet(`${resources}/${pageId}`)
        return res;
    },

    async createPage(payload) {
        const res = await axiosPost(`${resources}`, payload)
        return res;
    }
}