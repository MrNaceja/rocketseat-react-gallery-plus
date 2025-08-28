import { zodResolver } from "@hookform/resolvers/zod";
import { type PropsWithChildren, useCallback, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z4 from "zod/v4";

import { PhotoPickerSelector } from "@/components/photo-picker-selector";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TextField } from "@/components/ui/text-field";
import { useNewAlbumMutation } from "@/hooks/use-new-album-mutation";

const newAlbumFormSchema = z4.object({
    title: z4.string(),
    photos: z4.array(z4.uuid())
})

type NewAlbumFormSchema = z4.infer<typeof newAlbumFormSchema>

export function NewAlbumDialog({ children: trigger }: PropsWithChildren) {
    const [open, setOpen] = useState(false)
    
    const { newAlbum, isPending: isCreatingNewAlbum } = useNewAlbumMutation()

    const newAlbumForm = useForm<NewAlbumFormSchema>({
        resolver: zodResolver(newAlbumFormSchema),
        defaultValues: {
            title: "",
            photos: []
        },
        disabled: isCreatingNewAlbum
    })

    const closeDialog = useCallback(() => {
        newAlbumForm.reset()
        setOpen(false)
    }, [newAlbumForm])

    const handleCreateNewAlbum = useCallback<SubmitHandler<NewAlbumFormSchema>>(({ title, photos }) => {
        toast.promise(
            newAlbum({
                title,
                photosIds: photos
            }), {
            loading: "Adicionando Álbum...",
            success() {
                closeDialog()
                return {
                    message: "Álbum adicionado com sucesso!"
                }
            },
            error: "Houve um erro ao adicionar o álbum!",
        })
    }, [newAlbum, closeDialog])

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

            <Dialog.Content className="max-w-xl min-w-md">
                <Dialog.Header>
                    <Dialog.Title>Criar álbum</Dialog.Title>
                    <Dialog.Description className="sr-only">Adicionar novo álbum</Dialog.Description>
                    <Dialog.Close />
                </Dialog.Header>

                <form onSubmit={newAlbumForm.handleSubmit(handleCreateNewAlbum)}>
                    <Dialog.Body className="flex flex-col gap-5">
                        <TextField
                            placeholder="Adicione um titulo"
                            className="w-full"
                            {...newAlbumForm.register("title")}
                        />
                        <Controller
                            control={newAlbumForm.control}
                            name="photos"
                            render={({ field }) => (
                                <PhotoPickerSelector
                                    value={field.value}
                                    onSelect={field.onChange}
                                />
                            )}
                        />
                    </Dialog.Body>

                    <Dialog.Footer>
                        <Dialog.Dismiss asChild>
                            <Button variant="secondary" disabled={isCreatingNewAlbum}>Cancelar</Button>
                        </Dialog.Dismiss>
                        <Button variant="primary" type="submit" disabled={isCreatingNewAlbum} handling={isCreatingNewAlbum}>
                            {isCreatingNewAlbum ? "Adicionando..." : "Adicionar"}
                        </Button>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}