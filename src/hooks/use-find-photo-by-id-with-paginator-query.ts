import { useQuery } from "@tanstack/react-query";

import { type FindPhotoByIdWithPaginatorPayload,PhotoService } from "@/services/gallery-plus/photo.service";

interface UseFindPhotoByIdWithPagintorQueryProps extends FindPhotoByIdWithPaginatorPayload {}
export function useFindPhotoByIdWithPagintorQuery({ id }: UseFindPhotoByIdWithPagintorQueryProps) {
    const { data: photoWithPaginator, ...query } = useQuery({
        queryKey: ["find-photo-by-id-with-pagintor", id],
        queryFn: () => PhotoService.findPhotoByIdWithPaginator({
            id
        })
    })

    return {
        photoWithPaginator,
        ...query
    }
}