import { createFileRoute } from '@tanstack/react-router'

import { AlbumsSelectorFilter } from "@/components/albums-selector-filter"
import { PhotoCard } from "@/components/photo-card"
import { Text } from "@/components/ui/text"
import type { Photo } from "@/services/gallery-plus/photo.service"

const photos: Photo[] = Array.from({ length: 15 }).map((_, idx) => ({
  id: String(idx + 1),
  name: `Photo ${idx + 1}`,
  url: "https://picsum.photos/600/400",
  albums: Array.from({ length: 5 }).map((_, idxAlbum) => ({
    id: String(idxAlbum + 1),
    title: `Album ${idxAlbum + 1}`
  }))
}))

export const Route = createFileRoute('/')({
  component: function IndexPage() {
    return (
      <section className="flex flex-col gap-6">
        <AlbumsSelectorFilter />
        <Text variant="label-small" className="text-accent-span text-right">Total: {photos.length}</Text>
        <div className="grid grid-cols-5 gap-9">
          {
            photos.map(photo => (
              <PhotoCard photo={photo} />
            ))
          }
        </div>
      </section>
    )
  },
})