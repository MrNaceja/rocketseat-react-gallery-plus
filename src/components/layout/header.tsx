import { type ChangeEvent, useState } from "react";

import SearchIcon from "@/assets/icons/search.svg?react"
import LogoIcon from "@/assets/images/galeria-plus-full-logo.svg?react"
import { NewPhotoDialog } from "@/components/dialog/new-photo-dialog";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { TextField } from "@/components/ui/text-field";
import { Route as IndexRoute } from "@/routes";

export function Header() {
    const [search, setSearch] = useState("")

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <Container as="header" className="py-9 flex items-center gap-6">
            <IndexRoute.Link to={IndexRoute.to}>
                <Icon
                    svg={LogoIcon}
                />
            </IndexRoute.Link>
            <TextField
                className="flex-1"
                leadingIcon={SearchIcon}
                placeholder="Buscar fotos..."
                value={search}
                onChange={handleChangeSearch}
            />
            <Divider orientation="vertical" className="h-8" />
            <aside className="flex items-center gap-3">
                <NewPhotoDialog>
                    <Button variant="primary">Nova foto</Button>
                </NewPhotoDialog>
                <Button variant="secondary">Criar album</Button>
            </aside>
        </Container>
    )
}