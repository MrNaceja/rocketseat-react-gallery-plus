import "@tanstack/react-router"

import { router } from "@/app"

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
