import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useFetchPhotosQuery } from "@/hooks/use-fetch-photos-query";
import type { Photo } from "@/services/gallery-plus/photo.service";
import { createPhotoUrl } from "@/utils/create-photo-url";

interface PhotoPickerSelectorProps {
    value: Photo["id"][],
    onSelect: (selected: Photo["id"][]) => void
}
export function PhotoPickerSelector({ value, onSelect }: PhotoPickerSelectorProps) {
    const { photos, isLoading: isLoadingPhotos } = useFetchPhotosQuery()
    const hasPhotos = photos.length > 0

    return (
        <div className="flex flex-col gap-3">
            <Text variant="label-medium">Fotos cadastradas</Text>
            <ul className="flex items-center flex-wrap gap-3">
                {
                    isLoadingPhotos
                        ? (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <Skeleton key={idx} rounded="lg" className="size-20 aspect-square"/>
                            ))
                        )
                        : (
                            hasPhotos
                                ? (
                                    photos.map((photo) => (
                                        <PhotoSelection 
                                            key={photo.id} 
                                            photo={photo} 
                                            selected={value.includes(photo.id)}
                                            onSelectChange={(selected) => {
                                                let photosSelected = value
                                                if ( selected ) {
                                                    photosSelected.push(photo.id)
                                                }
                                                else {
                                                    photosSelected = photosSelected.filter(id => id !== photo.id)
                                                }
                                                
                                                onSelect(photosSelected)
                                            }}
                                        />
                                    ))
                                )
                                : (
                                    <EmptyState>
                                        Nenhuma foto disponível para seleção
                                    </EmptyState>
                                )
                        )
                }
            </ul>
        </div>
    )
}

interface PhotoSelectionProps {
    photo: Photo,
    selected?: boolean,
    onSelectChange?: (selected: boolean) => void
}
function PhotoSelection({ photo, selected = false, onSelectChange }: PhotoSelectionProps) {
    return (
        <span 
            className="rounded aspect-square size-20 border-2 border-transparent relative overflow-hidden has-checked:border-accent-brand"
        >
            <img
                src={createPhotoUrl(photo.imageId)}
                alt={photo.title}
                className="size-full object-cover"
            />
            <Checkbox
                className="absolute top-1.5 left-1.5"
                checked={selected}
                onChange={onSelectChange}
            />
        </span>
    )
}