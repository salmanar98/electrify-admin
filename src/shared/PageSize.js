import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

const PageSizeSelect = ({ pageSize, handleChangePageSize }) => {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <InputLabel id="page-size-label">Page Size</InputLabel>
      <Select
        labelId="page-size-label"
        id="page-size"
        value={pageSize}
        onChange={handleChangePageSize}
        sx={{ minWidth: 200, height: '40px' }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    </Box>
  );
};

export default PageSizeSelect;
