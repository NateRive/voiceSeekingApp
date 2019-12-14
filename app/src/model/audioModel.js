import { axiosGet } from "./axios";
const resources = "/audios"

export default {
    async getByAudioId(audioId) {
        const res = await axiosGet(`${resources}/${audioId}`)
        return res;
    }
}