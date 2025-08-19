import { createFileRoute } from '@tanstack/react-router'

import { Text } from "@/components/text"
import { PhotoDetailsLink } from "@/routes/photos.$photoId"

export const Route = createFileRoute('/')({
  component: function IndexPage() {
    return (
      <div className="p-2">
        <Text>Gallery +</Text>
        <PhotoDetailsLink params={{ photoId: "sdad" }} to="">
          <Text>Detalhes Foto</Text>
        </PhotoDetailsLink>
      </div>
    )
  },
})

