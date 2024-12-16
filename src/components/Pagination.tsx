import { Button } from "../ui/Button";
import { ArrowLeft } from "../ui/Icons";

type PaginationProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalProperties: number;
    loading: boolean;
};

export function Pagination({ page, setPage, totalProperties, loading }: PaginationProps) {
    const totalPages = Math.ceil(totalProperties / 10);

    const handleNext = () => {
        window.scrollTo({
            top: 50,
            behavior: "instant",
        });
        setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevious = () => {
        window.scrollTo({
            top: 50,
            behavior: "instant",
        });
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    if (totalPages <= 1) return null;

    return (
        <nav role="navigation" aria-label="pagination" className="mx-auto flex w-full justify-end gap-4 items-center">
            <Button variant="quaternary" onClick={handlePrevious} disabled={page === 1 || loading} className="gap-1 pl-2.5">
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <NumbersPagination page={page} setPage={setPage} totalPages={totalPages} />
            <Button variant="quaternary" onClick={handleNext} disabled={page >= totalPages || loading} className="gap-1 pr-2.5">
                Siguiente
                <ArrowLeft className="w-5 h-5 rotate-180" />
            </Button>
        </nav>
    );
}

const NumbersPagination = ({ page, setPage, totalPages }: { page: number; totalPages: number; setPage: React.Dispatch<React.SetStateAction<number>> }) => {
    const calculatePageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (page <= 3) {
            return [1, 2, 3, 4, 5];
        }
        if (page >= totalPages - 2) {
            return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        return [page - 2, page - 1, page, page + 1, page + 2];
    };

    const pageNumbers = calculatePageNumbers();

    return (
        <>
            {page > 3 && totalPages > 5 && (
                <>
                    <Button variant="quaternary" onClick={() => setPage(1)} className="text-gray-700 hover:text-gray-900">
                        1
                    </Button>
                    <span className="text-gray-500">...</span>
                </>
            )}

            {pageNumbers.map((pageNumber) => (
                <Button
                    key={pageNumber}
                    variant="quaternary"
                    onClick={() => setPage(pageNumber)}
                    className={`${pageNumber === page ? "text-black font-bold underline" : "text-gray-700"} hover:text-gray-900`}
                >
                    {pageNumber}
                </Button>
            ))}

            {page < totalPages - 2 && totalPages > 5 && (
                <>
                    <span className="text-gray-500">...</span>
                    <Button variant="quaternary" onClick={() => setPage(totalPages)} className="text-gray-700 hover:text-gray-900">
                        {totalPages}
                    </Button>
                </>
            )}
        </>
    );
};
