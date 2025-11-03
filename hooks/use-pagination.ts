export interface UsePaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    searchParams?: Record<string, string>;
    delta?: number;
}

export function usePagination({
    currentPage,
    totalPages,
    baseUrl,
    searchParams = {},
    delta = 2,
}: UsePaginationProps) {

    const getPageUrl = (page: number) => {
        if (page < 1 || page > totalPages) return '#';
        const params = new URLSearchParams({ ...searchParams, page: String(page) });
        return `${baseUrl}?${params.toString()}`;
    };

    const getVisiblePages = () => {
        if (totalPages <= 1) return [];
        
        const range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        const rangeWithDots: (number | string)[] = [];
        
        rangeWithDots.push(1);

        if (currentPage - delta > 2) {
            rangeWithDots.push("...");
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...");
        }

        // Add the last page if it's not already in the range
        if (totalPages > 1 && !range.includes(totalPages)) {
            rangeWithDots.push(totalPages);
        }

        const uniquePages = [...new Set(rangeWithDots)];
        
        if (uniquePages[1] === "..." && uniquePages[2] === 2) {
            uniquePages.splice(1, 1);
        }
        if (uniquePages[uniquePages.length - 2] === "..." && uniquePages[uniquePages.length - 1] === totalPages && uniquePages[uniquePages.length - 3] === totalPages-1) {
            uniquePages.splice(uniquePages.length - 2, 1);
        }

        return uniquePages;
    };

    const visiblePages = getVisiblePages();
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;
    const previousPageUrl = getPageUrl(currentPage - 1);
    const nextPageUrl = getPageUrl(currentPage + 1);

    return {
        visiblePages,
        hasPreviousPage,
        hasNextPage,
        previousPageUrl,
        nextPageUrl,
        getPageUrl,
        currentPage,
    };
}