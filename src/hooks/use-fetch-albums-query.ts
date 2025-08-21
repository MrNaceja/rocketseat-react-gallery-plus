import { useQuery } from "@tanstack/react-query";

import { AlbumService } from "@/services/gallery-plus/album.service";

export function useFetchAlbumsQuery() {
    const { data: albums, ...query } = useQuery({
        queryKey: ["fetch-albums"],
        queryFn: AlbumService.fetchAlbums
    })

    return {
        albums: albums || [],
        ...query
    }
}