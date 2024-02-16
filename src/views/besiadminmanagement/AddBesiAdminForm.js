import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createAdmin, editAdmin } from 'src/ApiCalls/AdminApiCalls';

const AddBesiAdminForm = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: userId } = useParams();

  const handleForm = async (values) => {
    let response;
    if (!userId) {
      response = await createAdmin(values);
    } else {
      response = await editAdmin(values, userId);
    }
    if (response) {
      navigate('/admin-management');
    }
  };

  const validationSchema = Yup.object().shape(
    {
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      accessLevel: Yup.string().required('Access Level is required'),
      password: !userId
        ? Yup.string().min(8).required('Password is required')
        : Yup.string()
            .min(8)
            .when('confirmPassword', {
              is: (confirmPassword) => !!confirmPassword,
              then: () =>
                Yup.string()
                  .required('Password is required')
                  .min(8, 'Password should be of minimum 8 characters length.'),
              otherwise: () =>
                Yup.string().min(8, 'Password should be of minimum 8 characters length.'),
            }),
      confirmPassword: !userId
        ? Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
        : Yup.string().when('password', {
            is: (password) => !!password,
            then: () =>
              Yup.string()
                .required('Password is required')
                .min(8, 'Password should be of minimum 8 characters length.')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            otherwise: () =>
              Yup.string().min(8, 'Password should be of minimum 8 characters length.'),
          }),
    },
    ['password', 'confirmPassword'],
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userData?.first_name ?? '',
      lastName: userData?.last_name ?? '',
      email: userData?.email ?? '',
      accessLevel: userData?.access_level ?? '',
      password: '',
      confirmPassword: '',
      isActive: userData?.active_status ?? false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleForm(values);
    },
  });

  const accessLevelOptions = useMemo(() => {
    return [
      { label: 'Standard User', value: '3' },
      { label: 'Primary Admin', value: '4' },
    ];
  }, []);

  const handleReset = useCallback(() => {
    navigate('/admin-management');
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      setUserData(state);
    }
  }, [setUserData, userId, state]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            bgcolor: '#ffffff',
            marginTop: { xs: 4, sm: 8 },
            padding: { xs: 3, sm: 6 },
            borderRadius: 6,
            position: 'relative',
          }}
        >
          <Typography variant="h3"> {!userId ? 'Add Admin' : 'Update Admin'}</Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>First Name:</Typography>
              <TextField
                fullWidth
                id="first-name"
                name="firstName"
                variant="outlined"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Last Name:</Typography>
              <TextField
                fullWidth
                id="last-name"
                name="lastName"
                variant="outlined"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Email:</Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
                Access Level:
              </Typography>
              <Select
                fullWidth
                id="accessLevel"
                name="accessLevel"
                variant="outlined"
                value={formik.values.accessLevel}
                onChange={formik.handleChange}
                error={formik.touched.accessLevel && Boolean(formik.errors.accessLevel)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Access Level
                </MenuItem>
                {accessLevelOptions.map((option) => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.accessLevel && formik.errors.accessLevel ? (
                <Typography variant="caption" color="error">
                  {formik.errors.accessLevel}
                </Typography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Password:</Typography>
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
                Confirm Password:
              </Typography>
              <TextField
                fullWidth
                id="confirm-password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>

            <Box sx={{ mt: 2, ml: 2 }}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Status:</Typography>
              <RadioGroup
                aria-label="active"
                name="isActive"
                value={formik.values.isActive ? 'active' : 'inactive'}
                onChange={(event) => {
                  formik.setFieldValue('isActive', event.target.value === 'active');
                }}
                row
              >
                <FormControlLabel value="active" control={<Radio color="primary" />} label="Yes" />
                <FormControlLabel value="inactive" control={<Radio color="primary" />} label="No" />
              </RadioGroup>
            </Box>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            size="large"
            sx={{ mr: 2, bgcolor: 'white', color: 'black', border: 'white' }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<CheckIcon />}
            color="primary"
          >
            {userId ? 'Update' : 'Add'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddBesiAdminForm;
