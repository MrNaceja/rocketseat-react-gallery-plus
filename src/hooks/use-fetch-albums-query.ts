import { useQuery } from "@tanstack/react-query";

import { AlbumService } from "@/services/gallery-plus/album.service";

export const FETCH_ALBUMS_STATIC_QUERY_KEY = "fetch-albums"

export function useFetchAlbumsQuery() {
    const { data: albums, ...query } = useQuery({
        queryKey: [FETCH_ALBUMS_STATIC_QUERY_KEY],
        queryFn: AlbumService.fetchAlbums
    })

    return {
        albums: albums || [],
        ...query
    }
}