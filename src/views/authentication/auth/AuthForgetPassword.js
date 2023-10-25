import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { forgetpassword } from 'src/ApiCalls/AuthApiCalls';

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});

const AuthForgetPassword = ({ title, subtitle, subtext, infotext }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    const email = values.email;

    try {
      let response = await forgetpassword({ email });
      if (response) {
        navigate('/auth/otpconfirmation');
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '70%', margin: 'auto' }}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      {infotext}

      <Stack pt={3} pb={1}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email">
            Email
          </Typography>
          <CustomTextField
            variant="outlined"
            id="email"
            name="email"
            type="eamil"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
      </Stack>
      <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
        <Typography fontWeight="500">Remember the password?</Typography>
        <Typography
          component={Link}
          to="/auth/login"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            cursor: 'pointer',
            zIndex: '10000',
          }}
        >
          Back to Login!
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <LoadingButton
          color="primary"
          variant="contained"
          sx={{
            borderRadius: '20px',
            width: '70%',
            margin: 'auto',
            '&:hover': {
              backgroundColor: '#000096',
            },
          }}
          loading={loading}
          loadingIndicator="Submitting..."
          type="submit"
        >
          Request Password Change
        </LoadingButton>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthForgetPassword;
