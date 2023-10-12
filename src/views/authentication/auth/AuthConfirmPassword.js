import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { errorToast } from 'src/shared/Toast';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { updatePassword } from 'src/ApiCalls/AuthApiCalls';

const validationSchema = yup.object().shape({
  password1: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length.')
    .required('Password is required.'),
  password2: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length.')
    .required('Confirm Password is required.')
    .test('passwords-match', 'Passwords must match', function (value) {
      return value === this.parent.password1;
    }),
});

const AuthConfirmPassword = ({ subtext, token, infotext }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    const password = values.password1;
    const password2 = values.password2;
    if (password.length < 8) {
      errorToast('Password must be of minimum 8 characters.');
    } else {
      if (password === password2) {
        const body = {
          otp: state.otp,
          email: state.email,
          password: password,
          password_confirmation: password2,
        };
        setLoading(true);
        try {
          const response = await updatePassword(body);
          if (response) {
            navigate('/auth/login');
          }
        } catch (e) {
        } finally {
          setLoading(false);
        }
      } else {
        errorToast('Passwords must be same.');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      password1: '',
      password2: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '80%', margin: 'auto' }}>
      {subtext}
      {infotext}

      <Stack pt={3} pb={4}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password1"
            mb="5px"
          >
            New Password
          </Typography>
          <CustomTextField
            variant="outlined"
            name="password1"
            id="password1"
            fullWidth
            type="password"
            value={formik.values.password1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password1 && Boolean(formik.errors.password1)}
            helperText={formik.touched.password1 && formik.errors.password1}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password2"
            mb="5px"
          >
            Confirm Password
          </Typography>
          <CustomTextField
            variant="outlined"
            name="password2"
            id="password2"
            fullWidth
            type="password"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />
        </Box>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingButton
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          loading={loading}
          loadingIndicator="Submitting..."
          type="submit"
          sx={{
            borderRadius: '20px',
            width: '70%',
            height: '40px',
            margin: 'auto',
            '&:hover': {
              backgroundColor: '#000096',
            },
          }}
        >
          Change Password
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default AuthConfirmPassword;
