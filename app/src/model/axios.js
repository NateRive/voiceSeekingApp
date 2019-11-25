import axios from "axios";
const DEVELOP = "development"
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV == DEVELOP) {
    console.log("a")
    var domain = "http://localhost:3000"
}
const baseURL = `${domain}/api`
const axiosObject = axios.create({
    baseURL
})

export const axiosGet = async (path) => {
    const res = await axiosObject.get(path)
    if (res.status === 200) {
        return res.data
    } else {
        console.log("error happend in axios", res)
    }
}

export const axiosPost = async (path, payload) => {
    try {
        const res = await axiosObject.post(path, payload)
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