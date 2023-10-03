import React, { useState } from 'react';
import axios from 'src/utils/axios';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { setAuthData } from 'src/reducers/slices/AuthSLice';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { errorToast, successToast } from 'src/shared/Toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    termsPrivacy: false,
  });
  const navigate = useNavigate();
  const loading = useSelector((state) => state.Alerts.beatLoader);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = async (e) => {
    const body = {
      email: values.email,
      password: values.password,
    };

    try {
      const { data } = await axios.post('/login', body);

      if (data?.status) {
        const token = data.data?.access_token;

        localStorage.setItem('authToken', token);
        dispatch(setAuthData(data?.data));
        successToast(data.message);
        navigate('/');
      } else {
        errorToast('Invalid Credentials');
      }
    } catch (error) {
      errorToast('Login failed');

      console.error('Login failed', error);
    }
  };
  const handleForgotPasswordClick = () => {
    navigate('/auth/forgetpassword');
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 1 }} component="form">
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Email Address
        </Typography>
        <TextField
          id="email"
          type="email"
          fullWidth
          value={values.email}
          onChange={handleChange('email')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Password
          </Typography>
          <Box
            sx={{ marginBottom: 1, cursor: 'pointer', zIndex: 1 }}
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </Box>
        </Box>
        <TextField
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          fullWidth
          value={values.password}
          onChange={handleChange('password')}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={Boolean(loading)}
          sx={{
            borderRadius: '20px',
            width: '50%',
            margin: 'auto',
            '&:hover': {
              backgroundColor: '#000096',
            },
          }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
