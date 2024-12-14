import { getPagination } from '../../utils/pagination'
import '../../styles/pagination.css'

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages = getPagination(totalPages, currentPage)

  return (
    <div className="pagination">
      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={page === currentPage ? 'currentPage' : 'notActive'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="dots">
            ...
          </span>
        )
      )}
    </div>
  )
}

export default Pagination
