import { api } from "@/services/gallery-plus/api"
import { type Photo, PhotoService } from "@/services/gallery-plus/photo.service"

export interface Album {
    id: string
    title: string
}

export type FetchAlbumsResponse = Album[]
export type CreateAlbumPayload = Pick<Album, "title">
export type NewAlbumPayload = {
    title: Album["title"],
    photosIds: Photo["id"][]
}

export const AlbumService = {
    async fetchAlbums() {
        const result = await api.get<FetchAlbumsResponse>("/albums")
        return result.data
    },
    async createAlbum({ title }: CreateAlbumPayload) {
        const result = await api.post<Album>("/albums", { title })
        return result.data
    },
    async newAlbum({ title, photosIds }: NewAlbumPayload) {
        const album = await AlbumService.createAlbum({ title })
        if ( photosIds.length > 0 ) {
            await Promise.all(photosIds.map((photoId) => {
                return PhotoService.managePhotoAlbums({
                    id: photoId,
                    albumsIds: [album.id]
                })
            }))
        } 
    }
}