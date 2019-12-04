import axios from "axios";
import { BASE_URL } from "../util/const";

// const axiosObject = axios.create({
//     BASE_URL
// })

export const axiosGet = async (path, queryObj = null) => {
    const params = { params: queryObj }
    try {
        console.log("iii", path)
        var res = await axios.get(BASE_URL + path, params)
        return res.data
    } catch (err) {
        console.log("error happend in axios", err)
        throw Error(err)
        // err.response
    }
}

export const axiosPost = async (path, payload) => {
    try {
        var res = await axios.post(BASE_URL + path, payload)
        return res.data;
    } catch (err) {
        console.log("error happend in axios", err.response)

    }
}