import React, { memo } from 'react';
import { Button } from '@mui/material';

const ClearFilterButton = ({ filterModel, gridRef }) => {
  return (
    <>
      {filterModel?.length ? (
        <Button
          sx={{ float: 'right' }}
          color="primary"
          size="small"
          variant="contained"
          onClick={() => gridRef.current.api.setFilterModel(null)}
        >
          Clear Filters
        </Button>
      ) : null}
    </>
  );
};

export default memo(ClearFilterButton);
