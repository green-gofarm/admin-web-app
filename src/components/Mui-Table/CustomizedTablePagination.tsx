import * as React from 'react';
import { DEFAULT_PAGINATION } from './setting';
import { styled } from '@mui/system';
import TablePaginationUnstyled, { tablePaginationUnstyledClasses as classes } from '@mui/base/TablePaginationUnstyled';

const blue = {
  200: '#A5D8FF',
  400: '#3399FF',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 50px;
      background-color: transparent;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      }
  
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      }
  
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      }
    }
    `,
);

interface CustomizedTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomizedTablePagination({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPageOptions
}: CustomizedTablePaginationProps) {

  return (
    <CustomTablePagination
      rowsPerPageOptions={rowsPerPageOptions || DEFAULT_PAGINATION.rowsPerPageOptions}
      rowsPerPage={rowsPerPage || DEFAULT_PAGINATION.rowsPerPage}
      count={count || 0}
      page={page - 1}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      slots={{
        root: "div"
      }}
      slotProps={{
        select: {
          'aria-label': 'rows per page',
        },
        actions: {
          lang: ""
        },
      }}
      labelRowsPerPage="Số hàng mỗi trang"
    />
  );
}
