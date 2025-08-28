import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FETCH_ALBUMS_STATIC_QUERY_KEY } from "@/hooks/use-fetch-albums-query";
import { FETCH_PHOTOS_STATIC_QUERY_KEY } from "@/hooks/use-fetch-photos-query";
import { AlbumService } from "@/services/gallery-plus/album.service";

export function useNewAlbumMutation() {
    const queryClient = useQueryClient()
    
    const { mutateAsync: newAlbum, ...mutation } = useMutation({
        mutationFn: AlbumService.newAlbum,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [ FETCH_PHOTOS_STATIC_QUERY_KEY ]
            })
            queryClient.invalidateQueries({
                queryKey: [ FETCH_ALBUMS_STATIC_QUERY_KEY ]
            })
        },
    })

    return {
        newAlbum,
        ...mutation
    }
}