import { createRouter, RouterProvider } from "@tanstack/react-router"

import { routeTree } from '@/routes/route-tree.gen'

export const router = createRouter({ routeTree })

export function App() {
    return (
        <RouterProvider router={router} />
    )
}