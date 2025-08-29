import type { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";

interface ConfirmDeletePhotoDialog extends PropsWithChildren {
    onConfirm?: () => void
}
export function ConfirmDeletePhotoDialog({ children: trigger, onConfirm }: ConfirmDeletePhotoDialog) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Content className="max-w-xl min-w-md">
                <Dialog.Header>
                    <Dialog.Title>Confirmação</Dialog.Title>
                    <Dialog.Description className="sr-only">Confirmar exclusão de foto</Dialog.Description>
                    <Dialog.Close />
                </Dialog.Header>

                <Dialog.Body className="flex flex-col gap-5">
                    <Text variant="heading-small">Tem certeza que deseja excluir esta foto?</Text>
                </Dialog.Body>

                <Dialog.Footer>
                    <Dialog.Dismiss asChild>
                        <Button variant="secondary">Não</Button>
                    </Dialog.Dismiss>
                    <Dialog.Dismiss asChild>
                        <Button variant="destructive" onClick={onConfirm}>
                            Confirmar exclusão
                        </Button>
                    </Dialog.Dismiss>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Root>
    )
}