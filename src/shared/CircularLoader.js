import { Box, CircularProgress } from '@mui/material';

const CircularLoader = () => {
  return (
    <Box
      sx={{
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularLoader;
