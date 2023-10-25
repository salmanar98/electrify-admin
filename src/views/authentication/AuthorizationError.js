import { Box, Container, Typography, Button } from '@mui/material';
import ErrorImg from 'src/assets/images/backgrounds/401-Error-Unauthorized.gif';

const AuthorizationError = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/auth/login';
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <img src={ErrorImg} alt="404" style={{ width: '100%', maxWidth: '500px' }} />
        <Typography align="center" variant="h4" mb={4}>
          Sorry! You are not authorised to access this page. Please contact administrator.
        </Typography>
        <Button color="primary" variant="contained" onClick={handleLogout} disableElevation>
          Logout
        </Button>
      </Container>
    </Box>
  );
};

export default AuthorizationError;
