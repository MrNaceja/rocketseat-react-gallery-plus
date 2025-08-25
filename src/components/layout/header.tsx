import { useMatch } from "@tanstack/react-router";
import { type ChangeEvent, useCallback, useState } from "react";

import SearchIcon from "@/assets/icons/search.svg?react"
import LogoIlustration from "@/assets/images/galeria-plus-full-logo.svg?react"
import { NewAlbumDialog } from "@/components/dialog/new-album-dialog";
import { NewPhotoDialog } from "@/components/dialog/new-photo-dialog";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { TextField } from "@/components/ui/text-field";
import { Route as IndexRoute } from "@/routes";
import { withDebounce } from "@/utils/with-debounce";

export function Header() {
    const [search, setSearch] = useState("")
    const navigate = IndexRoute.useNavigate()
    const isIndex = !!useMatch({
        from: "/",
        shouldThrow: false
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback<(searchTerm: string) => void>(
        withDebounce((searchTerm: string) => {
            navigate({
                search: (
                    searchTerm
                        ? ({
                            q: searchTerm
                        })
                        : ({})
                ),
            })
        }, 250),
        [navigate]
    )

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value
        setSearch(newSearch)
        debouncedSearch(newSearch)
    }

    return (
        <Container as="header" className="py-9 flex items-center gap-6">
            <IndexRoute.Link to={IndexRoute.to}>
                <LogoIlustration />
            </IndexRoute.Link>
            <span className="flex-1">
                {
                    isIndex && (
                        <TextField
                            className="w-full"
                            leadingIcon={SearchIcon}
                            placeholder="Buscar fotos..."
                            value={search}
                            onChange={handleChangeSearch}
                            type="search"
                        />
                    )
                }
            </span>
            <Divider orientation="vertical" className="h-8" />
            <aside className="flex items-center gap-3">
                <NewPhotoDialog>
                    <Button variant="primary">Nova foto</Button>
                </NewPhotoDialog>
                <NewAlbumDialog>
                    <Button variant="secondary">Criar album</Button>
                </NewAlbumDialog>
            </aside>
        </Container>
    )
}