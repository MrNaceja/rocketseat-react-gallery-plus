import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { Route as PhotoDetailsRoute } from "@/routes/photos.$photoId"
import type { Photo } from "@/services/gallery-plus/photo.service"

const AMOUNT_DISPLAYED_ALBUMS = 2

interface PhotoCardProps {
    photo: Photo
}
export function PhotoCard({ photo }: PhotoCardProps) {
    const displayedAlbums = photo.albums.slice(0, AMOUNT_DISPLAYED_ALBUMS)
    const amountOfRestAlbums = photo.albums.slice(AMOUNT_DISPLAYED_ALBUMS).length

    return (
        <div className="flex flex-col gap-4">
            <img
                alt={photo.name}
                src={photo.url}
                className="rounded-lg size-44 aspect-square object-cover"
            />

            <span className="flex flex-col gap-2">
                <Text variant="label-medium" className="text-accent-paragraph truncate">{photo.name}</Text>
                <div className="flex flex-wrap gap-2 items-center">
                    {displayedAlbums.map(album => (
                        <Badge key={album.id} size="xs" className="truncate">{album.title}</Badge>
                    ))}
                    <Badge size="xs" className="flex-1">+ {amountOfRestAlbums}</Badge>
                </div>
            </span>

            <PhotoDetailsRoute.Link to={PhotoDetailsRoute.to} params={{ photoId: photo.id }}>
                <Button variant="secondary" size="sm" className="w-full">Detalhes da imagem</Button>
            </PhotoDetailsRoute.Link>
        </div>
    )
}

export function PhotoCardSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton rounded="lg" className="size-44 aspect-square"/>

            <span className="flex flex-col gap-2">
                <Skeleton rounded="sm" className="w-3/4 h-5"/>
                <div className="flex flex-wrap gap-2 items-center">
                    <Skeleton rounded="sm" className="w-16 h-5"/>
                    <Skeleton rounded="sm" className="w-16 h-5"/>
                    <Skeleton rounded="sm" className="w-16 h-5"/>
                </div>
            </span>

            <Skeleton rounded="lg" className="w-full h-7"/>
        </div>
    )
}