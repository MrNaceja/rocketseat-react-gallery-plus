import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useFetchAlbumsQuery } from "@/hooks/use-fetch-albums-query";
import { Route as IndexRoute } from "@/routes"

export function AlbumsSelectorFilter() {
    const { albums, isLoading: isLoadingAlbums } = useFetchAlbumsQuery()
    const { albumId } = IndexRoute.useSearch()

    return (
        <div className="flex items-center gap-4">
            <Text variant="heading-small" className="text-heading">Álbuns</Text>

            <ul className="flex items-center overflow-x-auto gap-3">
                {
                    isLoadingAlbums
                        ? (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <Skeleton key={idx} rounded="sm" className="h-7 w-20" />
                            ))
                        )
                        : (
                            <>
                                <Button variant={!albumId ? "primary" : "ghost"} size="sm">
                                    <IndexRoute.Link to={IndexRoute.to}>
                                        Todos
                                    </IndexRoute.Link>
                                </Button>
                                {
                                    albums.map((album) => (
                                        <Button variant={albumId === album.id ? "primary" : "ghost"} size="sm" key={album.id}>
                                            <IndexRoute.Link to={IndexRoute.to} search={{ albumId: album.id }}>
                                                {album.title}
                                            </IndexRoute.Link>
                                        </Button>
                                    ))
                                }
                            </>

                        )
                }
            </ul>
        </div>
    )
}