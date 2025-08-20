import type { PropsWithChildren } from "react";

import { PhotoPickerSelector } from "@/components/photo-picker-selector";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TextField } from "@/components/ui/text-field";

export function NewAlbumDialog({ children: trigger }: PropsWithChildren) {

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

            <Dialog.Content className="max-w-xl min-w-md">
                <Dialog.Header>
                    <Dialog.Title>Criar álbum</Dialog.Title>
                    <Dialog.Close />
                </Dialog.Header>

                <Dialog.Body>
                    <form className="flex flex-col gap-5">
                        <TextField
                            placeholder="Adicione um titulo"
                            className="w-full"
                        />
                        <PhotoPickerSelector />
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