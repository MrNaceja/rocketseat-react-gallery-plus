import { useQuery } from "@tanstack/react-query";

import { PhotoService } from "@/services/gallery-plus/photo.service";

export function useFetchPhotosQuery() {
    const { data: photos, ...query } = useQuery({
        queryKey: ["fetch-photos"],
        queryFn: PhotoService.fetchPhotos
    })

    return {
        photos: photos || [],
        ...query
    }
}