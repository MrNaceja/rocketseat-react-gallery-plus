import { api } from "@/services/gallery-plus/api"

export interface Album {
    id: string
    title: string
}

export type FetchAlbumsResponse = Album[]

export const AlbumService = {
    async fetchAlbums() {
        const result = await api.get<FetchAlbumsResponse>("/albums")
        return result.data
    }
}