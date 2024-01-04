import axios from "axios";

const DEMO = process.env.NEXT_PUBLIC_URL_API_DEMO
const PROD = process.env.NEXT_PUBLIC_URL_API_PROD
const LOCAL = process.env.NEXT_PUBLIC_URL_API_LOCAL

const api = axios.create({
  baseURL: PROD
})

export { api }