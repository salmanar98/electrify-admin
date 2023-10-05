import React, { useState } from 'react';
import { successToast, errorToast } from 'src/shared/Toast';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import axios from '../../../utils/axios';

const AuthLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('/login', credentials);

      if (data.status && data.data) {
        const token = data.data.access_token;
        localStorage.setItem('authToken', token);
        navigate('/');
        successToast('Login successfully');
      } else {
        errorToast('Login failed');
        console.error('Login failed. Status is not true.');
      }
    } catch (error) {
      errorToast('Login failed');

      console.error('Login failed', error);
    }
  };

  const handleInputChange = (e, key) => {
    setCredentials((prevCredentials) => ({ ...prevCredentials, [key]: e.target.value }));
  };

  return (
    <>
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="Email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="Email"
            variant="outlined"
            fullWidth
            value={credentials.email}
            onChange={(e) => handleInputChange(e, 'email')}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={credentials.password}
            onChange={(e) => handleInputChange(e, 'password')}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          sx={{ backgroundColor: '#333333' }}
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default AuthLogin;
