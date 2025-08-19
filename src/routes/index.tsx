import { createFileRoute } from '@tanstack/react-router'
import type { ComponentProps } from "react"

export const Route = createFileRoute('/')({
  component: function IndexPage() {
    return (
      <>Index</>
    )
  },
})

export function IndexLink(props: ComponentProps<typeof Route.Link>) {
  return <Route.Link {...props} to={Route.to} />
}


