import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Header } from "@/components/layout/header"

export const Route = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <Header />
                <Outlet />
                <TanStackRouterDevtools />
            </>
        )
    }
})

