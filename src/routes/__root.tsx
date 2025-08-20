import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Header } from "@/components/layout/header"
import { Container } from "@/components/ui/container"

export const Route = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <Header />
                <Container as="main" className="py-6">
                    <Outlet />
                </Container>
                <TanStackRouterDevtools />
            </>
        )
    }
})

