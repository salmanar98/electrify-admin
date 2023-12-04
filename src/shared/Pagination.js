import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MaterialPagination from '@mui/material/Pagination';

const Pagination = ({ currentPage, totalPages, pageSize, handleChange }) => {
  const changePageSize = (event) => {
    if (pageSize !== event.target.value) {
      handleChange('pageSize', event.target.value);
    }
  };

  const changePage = (event, value) => {
    if (currentPage !== value) {
      handleChange('page', value);
    }
  };

  return (
    <Stack
      justifyContent="space-between"
      direction={{ xs: 'column', sm: 'row' }}
      width="100%"
      mt={5}
    >
      <Box display="inline-flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
        <FormControl sx={{ ml: 0, mr: 1, minWidth: 70 }} size="small">
          <Select
            value={pageSize}
            onChange={changePageSize}
            sx={{
              border: '1px solid #EAEAEF',
              boxShadow: '0px 1px 4px 0px #2121341A',
              fontWeight: 'bold',
            }}
          >
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" color="GrayText">
          Entries Per Page
        </Typography>
      </Box>
      <Box display="inline-flex" alignItems="center" ml={{ xs: '-10px', sm: 0 }}>
        <MaterialPagination
          count={totalPages}
          page={currentPage}
          shape="rounded"
          onChange={changePage}
        />
      </Box>
    </Stack>
  );
};

export default Pagination;
