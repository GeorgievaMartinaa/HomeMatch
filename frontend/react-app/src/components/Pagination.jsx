import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

export function PaginationComponent({handleNext, handlePrev, hasPrev, hasNext}) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={hasPrev ? handlePrev : undefined} className={!hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer" }/>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext onClick={hasNext ? handleNext : undefined} className={!hasNext ? "pointer-events-none opacity-50" : "cursor-pointer" }/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}