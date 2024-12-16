import { PaginationProps } from '../../../Types/property'

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        Anterior
      </button>
      <span className="text-gray-700">
        Pagina {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        Siguiente
      </button>
    </div>
  )
}

