import { useQuery } from "@tanstack/react-query";

import { type FindPhotoByIdWithPaginatorPayload,PhotoService } from "@/services/gallery-plus/photo.service";

export const FIND_PHOTO_BY_ID_WITH_PAGINATOR_STATIC_QUERY_KEY = "find-photo-by-id-with-pagintor"
interface UseFindPhotoByIdWithPagintorQueryProps extends FindPhotoByIdWithPaginatorPayload {}
export function useFindPhotoByIdWithPagintorQuery({ id }: UseFindPhotoByIdWithPagintorQueryProps) {
    const { data: photoWithPaginator, ...query } = useQuery({
        queryKey: [FIND_PHOTO_BY_ID_WITH_PAGINATOR_STATIC_QUERY_KEY, id],
        queryFn: () => PhotoService.findPhotoByIdWithPaginator({ id })
    })

    return {
        photoWithPaginator,
        ...query
    }
}