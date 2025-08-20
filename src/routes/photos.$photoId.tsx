import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/photos/$photoId')({
    component: function PhotoDetailsPage() {
        const { photoId } = Route.useParams()
        
        return (
            <section>
                <h1>Foto de ID: {photoId}</h1>
            </section>
        )
    },
})