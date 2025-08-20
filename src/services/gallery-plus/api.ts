import axios from "axios"

import { env } from "@/env"

export const api = axios.create({
    baseURL: env.VITE_GALLERY_PLUS_API_SERVICE_URL
})

api.interceptors.response.use(res => res.data)