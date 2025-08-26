import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FETCH_PHOTOS_STATIC_QUERY_KEY } from "@/hooks/use-fetch-photos-query";
import { PhotoService } from "@/services/gallery-plus/photo.service";

export function useNewPhotoMutation() {
    const queryClient = useQueryClient()
    
    const { mutateAsync: newPhoto, ...mutation } = useMutation({
        mutationFn: PhotoService.newPhoto,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [FETCH_PHOTOS_STATIC_QUERY_KEY]
            })
        },
    })

    return {
        newPhoto,
        ...mutation
    }
}