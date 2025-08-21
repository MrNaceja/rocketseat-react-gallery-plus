import z4 from "zod/v4";

const envSchema = z4.object({
    VITE_GALLERY_PLUS_API_SERVICE_URL: z4.url(),
    VITE_DEV_GALLERY_PLUS_API_SERVICE_DELAY_IN_SECONDS: z4.coerce.number().default(0)
})

export const env = envSchema.parse(import.meta.env)