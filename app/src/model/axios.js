import axios from "axios";
import { BASE_URL } from "../util/const";
console.log(BASE_URL)

// const axiosObject = axios.create({
//     BASE_URL
// })

export const axiosGet = async (path, queryObj = null) => {
    const params = { params: queryObj }
    const res = await axios.get(BASE_URL + path, params)
    if (res.status === 200) {
        console.log(res)
        return res.data
    } else {
        console.log("error happend in axios", res)
    }
}

export const axiosPost = async (path, payload) => {
    try {
        const res = await axios.post(BASE_URL + path, payload)
        console.log(res)
        if (res.status === 200) {
            return res.data
        } else {
            console.log("error happend in axios", res)
        }
    } catch (err) {
        console.log("error happend in axios", err.response.data)
    }

}