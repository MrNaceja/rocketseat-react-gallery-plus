import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";

export function App() {
	return (
		<div>
			<Dialog.Root>
				<Dialog.Trigger>
					<Button>Abrir Modal</Button>
				</Dialog.Trigger>

				<Dialog.Content>

					<Dialog.Header>
						<Dialog.Title>Titulo do modal</Dialog.Title>
						<Dialog.Close />
					</Dialog.Header>

					<Dialog.Body>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sunt dolore aliquam dolorum unde error magni iure inventore magnam ut. Maiores iure sint non laboriosam quo, repudiandae sunt! Voluptas, vitae.
						</p>
					</Dialog.Body>

					<Dialog.Footer>
						<Dialog.Dismiss>
							<Button variant="secondary">Cancelar</Button>
						</Dialog.Dismiss>
						<Button variant="primary">Concluir</Button>
					</Dialog.Footer>

				</Dialog.Content>
			</Dialog.Root>
		</div>
	)
}