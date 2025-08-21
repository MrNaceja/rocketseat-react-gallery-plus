import type { Album } from "@/services/gallery-plus/album.service"

export interface Photo {
    id: string,
    url: string,
    name: string,
    albums: Album[]
}

export const PhotoService = {

}