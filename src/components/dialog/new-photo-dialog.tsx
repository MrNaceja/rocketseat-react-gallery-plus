import { zodResolver } from "@hookform/resolvers/zod";
import { type PropsWithChildren, useCallback, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z4 from "zod/v4";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { acceptedTypes as imageUploadAcceptedTypes, UploadImageField } from "@/components/ui/upload-image-field";
import { useFetchAlbumsQuery } from "@/hooks/use-fetch-albums-query";
import { useNewPhotoMutation } from "@/hooks/use-new-photo-mutation";

const newPhotoFormSchema = z4.object({
    title: z4.string(),
    photo: z4.file(),
    albums: z4.array(z4.uuid())
})

type NewPhotoFormSchema = z4.infer<typeof newPhotoFormSchema>

export function NewPhotoDialog({ children: trigger }: PropsWithChildren) {
    const { albums, isLoading: isLoadingAlbums } = useFetchAlbumsQuery()
    const [open, setOpen] = useState(false)

    const { newPhoto, isPending: isCreatingNewPhoto } = useNewPhotoMutation()

    const newPhotoForm = useForm<NewPhotoFormSchema>({
        resolver: zodResolver(newPhotoFormSchema),
        defaultValues: {
            title: "",
            albums: []
        },
        disabled: isCreatingNewPhoto
    })

    const closeDialog = useCallback(() => {
        newPhotoForm.reset()
        setOpen(false)
    }, [newPhotoForm])

    const handleCreateNewPhoto = useCallback<SubmitHandler<NewPhotoFormSchema>>(({ title, photo, albums }) => {
        toast.promise(
            newPhoto({
                title,
                image: photo,
                albumsIds: albums
            }), {
            loading: "Adicionando foto...",
            success() {
                closeDialog()
                return {
                    message: "Foto adicionada com sucesso!"
                }
            },
            error: "Houve um erro ao adicionar a foto!",
        })
    }, [newPhoto, closeDialog])

    const hasAlbums = albums.length > 0

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

            <Dialog.Content className="max-w-xl">
                <form onSubmit={newPhotoForm.handleSubmit(handleCreateNewPhoto)}>
                    <Dialog.Header>
                        <Dialog.Title>Adicionar foto</Dialog.Title>
                        <Dialog.Description className="sr-only">Adicionar nova foto</Dialog.Description>
                        <Dialog.Close />
                    </Dialog.Header>

                    <Dialog.Body className="flex flex-col gap-5">
                        <TextField
                            placeholder="Adicione um titulo"
                            className="w-full"
                            required
                            {...newPhotoForm.register("title")}
                        />
                        <Alert>
                            <Text>Tamanho máximo: 50MB</Text>
                            <br />
                            <Text>Você pode selecionar apenas arquivos de imagem nos formatos {imageUploadAcceptedTypes.map(type => type.replace("image/", "")).join(", ")}</Text>
                        </Alert>

                        <Controller
                            control={newPhotoForm.control}
                            name="photo"
                            render={({ field }) => (
                                <UploadImageField
                                    {...field}
                                    required
                                />
                            )}
                        />

                        <div className="flex flex-col gap-3">
                            <Text variant="label-medium">Selecionar álbuns</Text>
                            <Controller
                                control={newPhotoForm.control}
                                name="albums"
                                render={({ field }) => (
                                    <ul className="flex flex-wrap gap-3">
                                        {
                                            isLoadingAlbums
                                                ? (
                                                    Array.from({ length: 5 }).map((_, idx) => (
                                                        <Skeleton key={idx} rounded="sm" className="h-7 w-20" />
                                                    ))
                                                )
                                                : (
                                                    hasAlbums
                                                        ? (
                                                            albums.map((album) => (
                                                                <Button
                                                                    disabled={field.disabled}
                                                                    key={album.id}
                                                                    variant={field.value.includes(album.id) ? "primary" : "ghost"}
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        let newFields = field.value
                                                                        if (field.value.includes(album.id)) {
                                                                            newFields = newFields.filter(albumId => albumId != album.id)
                                                                        }
                                                                        else {
                                                                            newFields = newFields.concat([album.id])
                                                                        }
                                                                        field.onChange(newFields)
                                                                    }}
                                                                >
                                                                    {album.title}
                                                                </Button>
                                                            ))
                                                        )
                                                        : (
                                                            <EmptyState>
                                                               Nenhum álbum disponível para seleção
                                                            </EmptyState>
                                                        )
                                                )
                                        }
                                    </ul>
                                )}
                            />
                        </div>
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.Dismiss asChild>
                            <Button variant="secondary" disabled={isCreatingNewPhoto}>Cancelar</Button>
                        </Dialog.Dismiss>
                        <Button variant="primary" type="submit" disabled={isCreatingNewPhoto} handling={isCreatingNewPhoto}>
                            {isCreatingNewPhoto ? "Adicionando..." : "Adicionar"}
                        </Button>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}