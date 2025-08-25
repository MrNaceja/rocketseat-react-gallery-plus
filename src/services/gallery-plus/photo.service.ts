import type { Album } from "@/services/gallery-plus/album.service"
import { api } from "@/services/gallery-plus/api"

export interface Photo {
    id: string,
    url: string,
    title: string,
    imageId: string,
    albums: Album[]
}

export type FetchPhotosResponse = Photo[]
export type FetchPhotosPayload = {
    albumId?: string,
    q?: string
}
export type FindPhotoByIdWithPaginatorResponse = Photo & {
    nextPhotoId: Photo["id"]
    previousPhotoId: Photo["id"]
}
export type FindPhotoByIdWithPaginatorPayload = Pick<Photo, "id">

export const PhotoService = {
    async fetchPhotos({ albumId, q }: FetchPhotosPayload) {
        const result = await api.get<FetchPhotosResponse>("/photos", {
            params: {
                albumId,
                q
            }
        })
        return result.data
    },
    async findPhotoByIdWithPaginator({ id }: FindPhotoByIdWithPaginatorPayload) {
        const result = await api.get<FindPhotoByIdWithPaginatorResponse>(`/photos/${id}`)
        return result.data
    }
}