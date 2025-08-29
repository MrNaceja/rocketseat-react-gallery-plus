import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Toaster } from "sonner"

import { routeTree } from '@/routes/route-tree.gen'

export const router = createRouter({ routeTree })

const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-right" theme="dark" richColors style={
                {
                    "--normal-bg": "var(--color-background-primary)",
                    "--normal-text": "var(--color-accent-paragraph)",
                    "--normal-border": "var(--color-border-primary)",
                } as React.CSSProperties
            } />
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}