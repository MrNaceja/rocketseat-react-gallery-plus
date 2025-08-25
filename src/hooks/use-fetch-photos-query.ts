import { useQuery } from "@tanstack/react-query";

import { type FetchPhotosPayload,PhotoService } from "@/services/gallery-plus/photo.service";

export function useFetchPhotosQuery({ albumId, q }: FetchPhotosPayload = {}) {
    const { data: photos, ...query } = useQuery({
        queryKey: ["fetch-photos", albumId, q],
        queryFn: () => PhotoService.fetchPhotos({ albumId, q })
    })

    return {
        photos: photos || [],
        ...query
    }
}