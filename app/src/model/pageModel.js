import { axiosGet } from "./axios";
const resources = "/page"

export default {
    async get(workspaceId) {
        const res = await axiosGet(`${resources}/${workspaceId}`)
        return res;
    }
}