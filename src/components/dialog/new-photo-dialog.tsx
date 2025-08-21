import { zodResolver } from "@hookform/resolvers/zod"
import type { PropsWithChildren } from "react";
import { Controller, useForm } from "react-hook-form"
import z4 from "zod/v4"

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { acceptedTypes as imageUploadAcceptedTypes, UploadImageField } from "@/components/ui/upload-image-field";
import { useFetchAlbumsQuery } from "@/hooks/use-fetch-albums-query";

const newPhotoFormSchema = z4.object({
    title: z4.string(),
    photo: z4.file(),
    albums: z4.array(z4.object({
        id: z4.string(),
        title: z4.string()
    }))
})

type NewPhotoFormSchema = z4.infer<typeof newPhotoFormSchema>

export function NewPhotoDialog({ children: trigger }: PropsWithChildren) {
    const { albums, isLoading: isLoadingAlbums } = useFetchAlbumsQuery()

    const newPhotoForm = useForm<NewPhotoFormSchema>({
        resolver: zodResolver(newPhotoFormSchema),
        defaultValues: {
            title: "",
            albums: albums
        }
    })

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

            <Dialog.Content className="max-w-xl">
                <Dialog.Header>
                    <Dialog.Title>Adicionar foto</Dialog.Title>
                    <Dialog.Close />
                </Dialog.Header>

                <Dialog.Body>
                    <form className="flex flex-col gap-5">
                        <TextField
                            placeholder="Adicione um titulo"
                            className="w-full"
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
                                />
                            )}
                        />

                        <div className="flex flex-col gap-3">
                            <Text variant="label-medium">Selecionar álbuns</Text>
                            <ul className="flex flex-wrap gap-3">
                                {
                                    isLoadingAlbums
                                        ? (
                                            Array.from({ length: 5 }).map((_, idx) => (
                                                <Skeleton key={idx} rounded="sm" className="h-7 w-20" />
                                            ))
                                        )
                                        : (
                                            albums.map((album) => (
                                                <Button key={album.id} variant="ghost" size="sm">{album.title}</Button>
                                            ))
                                        )
                                }
                            </ul>
                        </div>
                    </form>
                </Dialog.Body>

                <Dialog.Footer>
                    <Dialog.Dismiss>
                        <Button variant="secondary">Cancelar</Button>
                    </Dialog.Dismiss>
                    <Button variant="primary">Adicionar</Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    )
}