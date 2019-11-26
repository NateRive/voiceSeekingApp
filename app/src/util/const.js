const DEVELOP = "development"
const PREVIEW = "preview"
var domain;
if (process.env.NODE_ENV == DEVELOP) {
  console.log("a")
  domain = "http://localhost:3000"
} else if (process.env.NODE_ENV == PREVIEW) {
  domain = "http://54.80.183.167:3000"
}

const baseURL = `${domain}/api`


export const DOMAIN = domain;
export const BASE_URL = baseURL
