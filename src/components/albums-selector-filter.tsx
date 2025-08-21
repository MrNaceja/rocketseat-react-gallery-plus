import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useFetchAlbumsQuery } from "@/hooks/use-fetch-albums-query";

export function AlbumsSelectorFilter() {
    const { albums } = useFetchAlbumsQuery()
    
    return (
        <div className="flex items-center gap-4">
            <Text variant="heading-small" className="text-heading">Álbuns</Text>

            <ul className="flex items-center overflow-x-auto gap-3">
                <Button variant="primary" size="sm">Todos</Button>
                {
                    albums.map((album) => (
                        <Button variant="ghost" size="sm" key={album.id}>{album.title}</Button>
                    ))
                }
            </ul>
        </div>
    )
}