import { usePagination, UsePaginationProps } from "@/hooks/use-pagination";

interface PaginationRenderProps {
    visiblePages: (string | number)[];
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    previousPageUrl: string;
    nextPageUrl: string;
    getPageUrl: (page: number) => string;
    currentPage: number;
}

interface PaginationProps extends UsePaginationProps {
    children: (props: PaginationRenderProps) => React.ReactNode;
}

export default function Pagination({ children, ...props }: PaginationProps) {
    const paginationState = usePagination(props);

    
    return <>{children(paginationState)}</>;
}