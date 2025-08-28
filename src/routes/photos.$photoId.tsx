import { useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useTransition } from "react"
import { toast } from "sonner"

import PreviousIcon from "@/assets/icons/chevron-left.svg?react"
import NextIcon from "@/assets/icons/chevron-right.svg?react"
import { Button } from "@/components/ui/button"
import { ButtonIcon } from "@/components/ui/button-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Divider } from "@/components/ui/divider"
import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { useFetchAlbumsQuery } from "@/hooks/use-fetch-albums-query"
import { FETCH_PHOTOS_STATIC_QUERY_KEY } from "@/hooks/use-fetch-photos-query"
import { FIND_PHOTO_BY_ID_WITH_PAGINATOR_STATIC_QUERY_KEY, useFindPhotoByIdWithPagintorQuery } from "@/hooks/use-find-photo-by-id-with-paginator-query"
import type { Album } from "@/services/gallery-plus/album.service"
import { type Photo, PhotoService } from "@/services/gallery-plus/photo.service"
import { createPhotoUrl } from "@/utils/create-photo-url"

export const Route = createFileRoute('/photos/$photoId')({
    component: function PhotoDetailsPage() {
        const queryClient = useQueryClient()
        const { photoId } = Route.useParams()
        const { albums, isLoading: isLoadingAlbums } = useFetchAlbumsQuery()
        const { photoWithPaginator, isLoading: isFindingPhoto } = useFindPhotoByIdWithPagintorQuery({ id: photoId })
        const navigate = Route.useNavigate()
        const [isManagingPhotoOnAlbum, startManagingPhotoOnAlbumTransition] = useTransition()

        const isNotInteractive = isFindingPhoto || isLoadingAlbums
        const hasNextPhoto = !!photoWithPaginator?.nextPhotoId
        const hasPreviousPhoto = !!photoWithPaginator?.previousPhotoId

        const navigateToAnotherPhoto = (photoId: Photo["id"]) => {
            navigate({ to: "/photos/$photoId", params: { photoId } })
        }

        const handlePaginateToNextPhoto = () => {
            if (hasNextPhoto) {
                navigateToAnotherPhoto(photoWithPaginator.nextPhotoId)
            }
        }

        const handlePaginateToPreviousPhoto = () => {
            if (hasPreviousPhoto) {
                navigateToAnotherPhoto(photoWithPaginator.previousPhotoId)
            }
        }

        const existentAlbumsOnPhotoIds = useMemo(() => photoWithPaginator?.albums.map(({ id }) => id) || [], [photoWithPaginator])

        const checkIsPhotoOnAlbum = (albumId: Album["id"]) => existentAlbumsOnPhotoIds.some((photoAlbumId) => albumId === photoAlbumId)

        const withHandleTogglePhotoOnAlbum = (albumId: Album["id"]) => () => {
            const isPhotoOnAlbum = checkIsPhotoOnAlbum(albumId)

            startManagingPhotoOnAlbumTransition(
                async () => {
                    await toast.promise(
                        PhotoService.managePhotoAlbums({
                            id: photoId,
                            albumsIds: (
                                !isPhotoOnAlbum 
                                ? [...existentAlbumsOnPhotoIds, albumId] 
                                : existentAlbumsOnPhotoIds.filter(photoAlbumId => photoAlbumId != albumId)
                            ),
                            overrideExistentAlbums: true
                        }),
                        {
                            loading: !isPhotoOnAlbum ? "Adicionando foto ao álbum..." : "Removendo foto do álbum...",
                            success: !isPhotoOnAlbum ? "Foto adicionado com sucesso ao álbum" : "Foto removida do álbum com sucesso",
                            error  : !isPhotoOnAlbum ? "Houve um erro ao adicionar a foto ao álbum" : "Houve um erro ao remover a foto do álbum"
                        }
                    ).unwrap()

                    queryClient.invalidateQueries({
                        queryKey: [FIND_PHOTO_BY_ID_WITH_PAGINATOR_STATIC_QUERY_KEY, photoId]
                    })
                    queryClient.invalidateQueries({
                        queryKey: [FETCH_PHOTOS_STATIC_QUERY_KEY]
                    })
                }
            )
        }

        return (
            <section className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                    {
                        isNotInteractive
                            ? (
                                <Skeleton rounded="sm" className="w-56 h-12" />
                            )
                            : (
                                <Text variant="heading-large" className="text-heading">{photoWithPaginator?.title}</Text>
                            )
                    }
                    <span className="flex items-center gap-2">
                        <ButtonIcon
                            variant="secondary"
                            icon={PreviousIcon}
                            disabled={isNotInteractive || !hasPreviousPhoto}
                            onClick={handlePaginateToPreviousPhoto}
                        />
                        <Button
                            variant="secondary"
                            icon={NextIcon}
                            disabled={isNotInteractive || !hasNextPhoto}
                            onClick={handlePaginateToNextPhoto}
                        >
                            Próxima imagem
                        </Button>
                    </span>
                </div>

                <div className="flex items-start gap-3 justify-between">
                    <span className="flex flex-col gap-3 items-start">
                        {
                            isNotInteractive
                                ? (
                                    <Skeleton rounded="lg" className="size-96 aspect-square" />
                                )
                                : (
                                    <img
                                        src={photoWithPaginator ? createPhotoUrl(photoWithPaginator.imageId) : ""}
                                        alt={photoWithPaginator?.title}
                                        title={photoWithPaginator?.title}
                                        className="size-96 object-cover aspect-square rounded-lg"
                                    />
                                )
                        }
                        <Button variant="destructive" disabled={isNotInteractive}>Excluir</Button>
                    </span>

                    <div className="flex flex-col gap-7 min-w-sm">
                        <Text variant="heading-small">Albums</Text>
                        <ul className="space-y-5">
                            {
                                isNotInteractive
                                    ? (
                                        Array.from({ length: 4 }).map((_, idx) => (
                                            <Skeleton key={idx} rounded="sm" className="h-16 w-full" />
                                        ))
                                    )
                                    : (
                                        albums.map((album) => (
                                            <li key={album.id} className="flex flex-col gap-5">
                                                <span className="flex items-center justify-between gap-3">
                                                    <Text variant="paragraph-medium" className="text-accent-paragraph">{album.title}</Text>
                                                    <Checkbox
                                                        disabled={isManagingPhotoOnAlbum}
                                                        defaultChecked={checkIsPhotoOnAlbum(album.id)}
                                                        onChange={withHandleTogglePhotoOnAlbum(album.id)}
                                                    />
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