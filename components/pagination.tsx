// components/ui/StyledPagination.tsx
import { UsePaginationProps } from "@/hooks/use-pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Pagination from "./ui/pagination/pagination";

// It accepts the same props as the hook
export default function StyledPagination(props: UsePaginationProps) {
    
    // If there's only one page, we don't need to render anything
    if (props.totalPages <= 1) return null;

    return (
        <Pagination {...props}>
            {({ 
                visiblePages, 
                hasPreviousPage, 
                hasNextPage, 
                previousPageUrl, 
                nextPageUrl, 
                getPageUrl, 
                currentPage 
            }) => (
                <nav className="flex items-center justify-center gap-1">
                    {/* Previous Button */}
                    <Link 
                        href={previousPageUrl} 
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                            !hasPreviousPage 
                                ? "text-gray-400 cursor-not-allowed bg-gray-100" 
                                : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
                        }`}
                        aria-disabled={!hasPreviousPage}
                    >
                        <ChevronLeft /> Previous
                    </Link>

                    {/* Page Numbers */}
                    {visiblePages.map((page, key) => {
                        if (page === "...") {
                            return <span key={key} className="px-3 py-2 text-sm text-gray-500">...</span>;
                        }
                        
                        const pageNumber = page as number;
                        const isCurrentPage = pageNumber === currentPage;

                        return (
                            <Link 
                                key={key} 
                                href={getPageUrl(pageNumber)} 
                                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                    isCurrentPage 
                                        ? "bg-purple-500 text-white" 
                                        : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                                }`}
                            >
                                {pageNumber}
                            </Link>
                        );
                    })}
                    
                    {/* Next Button */}
                    <Link 
                        href={nextPageUrl} 
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                            !hasNextPage 
                                ? "text-gray-400 cursor-not-allowed bg-gray-100" 
                                : "text-gray-700 hover:bg-gray-100 bg-white border border-gray-300"
                        }`}
                        aria-disabled={!hasNextPage}
                    >
                        Next <ChevronRight />
                    </Link>
                </nav>
            )}
        </Pagination>
    );
}