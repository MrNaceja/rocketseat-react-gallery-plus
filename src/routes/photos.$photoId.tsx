import { createFileRoute } from '@tanstack/react-router'

import PreviousIcon from "@/assets/icons/chevron-left.svg?react"
import NextIcon from "@/assets/icons/chevron-right.svg?react"
import { Button } from "@/components/ui/button"
import { ButtonIcon } from "@/components/ui/button-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Divider } from "@/components/ui/divider"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { useFetchAlbumsQuery } from "@/hooks/use-fetch-albums-query"

export const Route = createFileRoute('/photos/$photoId')({
    component: function PhotoDetailsPage() {
        const { photoId } = Route.useParams()
        const { albums, isLoading: isLoadingAlbums } = useFetchAlbumsQuery()

        const photo = {
            id: photoId,
            name: `Photo ${photoId}`,
            url: "https://picsum.photos/600/400",
            albums: Array.from({ length: 5 }).map((_, idxAlbum) => ({
                id: String(idxAlbum + 1),
                title: `Album ${idxAlbum + 1}`
            }))
        }

        const isLoading = false

        return (
            <section className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                    {
                        isLoading
                            ? (
                                <Skeleton rounded="sm" className="w-56 h-12" />
                            )
                            : (
                                <Text variant="heading-large" className="text-heading">{photo.name}</Text>
                            )
                    }
                    <span className="flex items-center gap-2">
                        <ButtonIcon
                            variant="secondary"
                            icon={PreviousIcon}
                            disabled={isLoading}
                        />
                        <Button
                            variant="secondary"
                            icon={NextIcon}
                            disabled={isLoading}
                        >
                            Próxima imagem
                        </Button>
                    </span>
                </div>

                <div className="flex items-start gap-3 justify-between">
                    <span className="flex flex-col gap-3 items-start">
                        {
                            isLoading
                                ? (
                                    <Skeleton rounded="lg" className="size-96 aspect-square" />
                                )
                                : (
                                    <img
                                        src={photo.url}
                                        alt={photo.name}
                                        title={photo.name}
                                        className="size-96 object-cover aspect-square rounded-lg"
                                    />
                                )
                        }
                        <Button variant="destructive" disabled={isLoading}>Excluir</Button>
                    </span>

                    <div className="flex flex-col gap-7 min-w-sm">
                        <Text variant="heading-small">Albums</Text>
                        <ul className="space-y-5">
                            {
                                isLoadingAlbums
                                    ? (
                                        Array.from({ length: 4 }).map((_, idx) => (
                                            <Skeleton key={idx} rounded="sm" className="h-16 w-full"/>
                                        ))
                                    )
                                    : (
                                        albums.map((album) => (
                                            <li key={album.id} className="flex flex-col gap-5">
                                                <span className="flex items-center justify-between gap-3">
                                                    <Text variant="paragraph-medium" className="text-accent-paragraph">{album.title}</Text>
                                                    <Checkbox />
                                                </span>
                                                <Divider orientation="horizontal" />
                                            </li>
                                        ))
                                    )
                            }
                        </ul>
                    </div>
                </div>
            </section>
        )
    },
})