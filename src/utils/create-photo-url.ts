import { env } from "@/env";
import type { Photo } from "@/services/gallery-plus/photo.service";

export const createPhotoUrl = (imageId: Photo["imageId"]) => `${env.VITE_GALLERY_PLUS_API_SERVICE_URL}/images/${imageId}` 