import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import HashLoader from 'react-spinners/HashLoader';
import { useTheme } from '@mui/material/styles';

const HashLoaderBackdrop = () => {
  const theme = useTheme();
  return (
    <Backdrop open={true} sx={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.1)' }}>
      <HashLoader size={80} color={theme.palette.primary.main} />
    </Backdrop>
  );
};

export default HashLoaderBackdrop;
