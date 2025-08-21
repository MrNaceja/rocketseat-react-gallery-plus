import axios from "axios";

import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_GALLERY_PLUS_API_SERVICE_URL,
});

if (env.VITE_DEV_GALLERY_PLUS_API_SERVICE_DELAY_IN_SECONDS > 0) {
  api.interceptors.request.use(
    (res) =>
      new Promise((ok) =>
        setTimeout(
          () => ok(res),
          env.VITE_DEV_GALLERY_PLUS_API_SERVICE_DELAY_IN_SECONDS * 1000
        )
      )
  );
}
