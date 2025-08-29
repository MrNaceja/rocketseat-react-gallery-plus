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
export type CreatePhotoPayload = Pick<Photo, "title">
export type UploadPhotoImagePayload = Pick<Photo, "id"> & { image: File }
export type ManagePhotoAlbumsPayload = Pick<Photo, "id"> & {
    albumsIds: Album["id"][], 
    overrideExistentAlbums?: boolean
}
export type NewPhotoPayload = {
    title: Photo["title"],
    image: File,
    albumsIds: Album["id"][] 
}
export type DeletePhotoPayload = Pick<Photo, "id">
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
    async deletePhoto({ id }: DeletePhotoPayload) {
        await api.delete(`/photos/${id}`)
    },
    async findPhotoByIdWithPaginator({ id }: FindPhotoByIdWithPaginatorPayload) {
        const result = await api.get<FindPhotoByIdWithPaginatorResponse>(`/photos/${id}`)
        return result.data
    },
    async createPhoto({ title }: CreatePhotoPayload) {
        const result = await api.post<Photo>("/photos", { title })
        return result.data
    },
    async uploadPhotoImage({ id, image: file }: UploadPhotoImagePayload) {
        await api.post(`/photos/${id}/image`, { file }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    async managePhotoAlbums({ id, albumsIds, overrideExistentAlbums = false }: ManagePhotoAlbumsPayload) {
        if ( albumsIds.length < 1 ) return
        await api.put(`/photos/${id}/albums`, { albumsIds, overrideExistentAlbums })
    },
    async newPhoto({ title, image, albumsIds }: NewPhotoPayload) {
        const newPhoto = await PhotoService.createPhoto({ title })
        await PhotoService.uploadPhotoImage({ id: newPhoto.id, image })
        await PhotoService.managePhotoAlbums({ id: newPhoto.id, albumsIds })
    }
}