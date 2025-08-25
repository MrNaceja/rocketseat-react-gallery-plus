import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import z4 from "zod/v4"

import { AlbumsSelectorFilter } from "@/components/albums-selector-filter"
import { PhotoCard, PhotoCardSkeleton } from "@/components/photo-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { useFetchPhotosQuery } from "@/hooks/use-fetch-photos-query"

export const Route = createFileRoute('/')({
  validateSearch: zodValidator(z4.object({
    albumId: z4.string().optional(),
    q: z4.string().optional()
  })),
  component: function IndexPage() {
    const { albumId, q } = Route.useSearch()
    const { photos, isLoading: isLoadingPhotos } = useFetchPhotosQuery({ albumId, q })

    return (
      <section className="flex flex-col gap-6">
        <AlbumsSelectorFilter />
        <span className="self-end">
          {
            isLoadingPhotos
              ? (
                <Skeleton rounded="sm" className="h-5 w-28" />
              )
              : (
                <Text variant="label-small" className="text-accent-span">Total: {photos.length}</Text>
              )
          }
        </span>
        <div className="grid grid-cols-5 gap-9">
          {
            isLoadingPhotos
              ? (
                Array.from({ length: 8 }).map((_, idx) => (
                  <PhotoCardSkeleton key={idx} />
                ))
              )
              : (
                photos.map(photo => (
                  <PhotoCard photo={photo} key={photo.id} />
                ))
              )
          }
        </div>
      </section>
    )
  },
})