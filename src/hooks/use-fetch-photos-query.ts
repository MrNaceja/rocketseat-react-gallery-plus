import { useQuery } from "@tanstack/react-query";

import { type FetchPhotosPayload,PhotoService } from "@/services/gallery-plus/photo.service";

export const FETCH_PHOTOS_STATIC_QUERY_KEY = "fetch-photos"

export function useFetchPhotosQuery({ albumId, q }: FetchPhotosPayload = {}) {
    const { data: photos, ...query } = useQuery({
        queryKey: [FETCH_PHOTOS_STATIC_QUERY_KEY, albumId, q],
        queryFn: () => PhotoService.fetchPhotos({ albumId, q })
    })

    return {
        photos: photos || [],
        ...query
    }
}