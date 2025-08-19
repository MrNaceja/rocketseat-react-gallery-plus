import { type ChangeEvent,useState } from "react";

import SearchIcon from "@/assets/icons/search.svg?react"
import LogoIcon from "@/assets/images/galeria-plus-full-logo.svg?react"
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { TextField } from "@/components/ui/text-field";
import { IndexLink } from "@/routes";

export function Header() {
    const [search, setSearch] = useState("")

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <Container as="header" className="py-9 flex items-center gap-6">
            <IndexLink>
                <Icon
                    svg={LogoIcon}
                />
            </IndexLink>
            <TextField 
                className="flex-1" 
                leadingIcon={SearchIcon} 
                placeholder="Buscar fotos..."
                value={search}
                onChange={handleChangeSearch}
            />
            <Divider orientation="vertical" className="h-8"/>
            <aside className="flex items-center gap-3">
                <Button variant="primary">Nova fota</Button>
                <Button variant="secondary">Criar album</Button>
            </aside>
        </Container>
    )
}