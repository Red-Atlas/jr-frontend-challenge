import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationButtonsProps {
  page: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  page,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4 w-[200px] h-[50px] bg-graylight rounded">
      {/* Paginado */}
      <div className="flex gap-2 my-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`p-2 ${page === 1 ? "opacity-50" : ""} text-red`}
        >
          <FaChevronLeft />
        </button>
        {/* Páginas a mostrar */}
        {Array.from({ length: 3 }, (_, i) => page - 1 + i)
          .filter((pageNum) => pageNum > 0 && pageNum <= totalPages)
          .map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`p-2 ${
                page === pageNum
                  ? " font-bold bg-gray rounded h-full text-white"
                  : ""
              }`}
            >
              {pageNum}
            </button>
          ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`p-2 ${page === totalPages ? "opacity-50" : ""} text-red`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationButtons;
