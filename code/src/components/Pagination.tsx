import { FunctionComponent } from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FunctionComponent<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const maxPagesToShow = 10;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>

      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_e, page) => handlePageClick(page)}
        variant="outlined"
        shape="rounded"
        color="primary"
        siblingCount={1}
        boundaryCount={1}
      />

    </Box>
  );
};

export default Pagination;
