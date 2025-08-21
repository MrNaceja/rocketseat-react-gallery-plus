import EmptyStateIlustration from "@/assets/images/select-checkbox.svg?react"
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import type { Photo } from "@/services/gallery-plus/photo.service";

const photos: Photo[] = Array.from({ length: 15 }).map((_, idx) => ({
    id: String(idx + 1),
    name: `Photo ${idx + 1}`,
    url: "https://picsum.photos/600/400",
    albums: Array.from({ length: 5 }).map((_, idxAlbum) => ({
        id: String(idxAlbum + 1),
        title: `Album ${idxAlbum + 1}`
    }))
}))

export function PhotoPickerSelector() {
    const hasPhotos = photos.length > 0
    const isLoadingPhotos = false

    return (
        <div className="flex flex-col gap-3">
            <Text variant="label-medium">Fotos cadastradas</Text>
            <ul className="flex items-center flex-wrap gap-3">
                {
                    isLoadingPhotos
                        ? (
                            Array.from({ length: 8 }).map((_, idx) => (
                                <Skeleton key={idx} rounded="lg" className="size-20 aspect-square"/>
                            ))
                        )
                        : (
                            hasPhotos
                                ? (
                                    photos.map((photo) => (
                                        <PhotoSelection key={photo.id} photo={photo} />
                                    ))
                                )
                                : <NoPhotosAvailableEmptyState />
                        )
                }
            </ul>
        </div>
    )
}

interface PhotoSelectionProps {
    photo: Photo
}
function PhotoSelection({ photo }: PhotoSelectionProps) {
    return (
        <span className="rounded aspect-square size-20 border-2 border-transparent relative overflow-hidden has-checked:border-accent-brand">
            <img
                src={photo.url}
                alt={photo.name}
                className="size-full object-cover"
            />
            <Checkbox className="absolute top-1.5 left-1.5" />
        </span>
    )
}

function NoPhotosAvailableEmptyState() {
    return (
        <div className="flex flex-col size-full gap-3 items-center justify-center">
            <EmptyStateIlustration />
            <Text variant="paragraph-medium" className="text-accent-paragraph">Nenhuma foto disponível para seleção</Text>
        </div>
    )
}