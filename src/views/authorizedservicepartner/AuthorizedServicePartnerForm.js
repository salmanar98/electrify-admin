import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Autocomplete,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
  createPartner,
  editPartner,
  getCities,
  getStates,
} from 'src/ApiCalls/AuthorizedServicePartnerApiCalls';

const countries = [{ label: 'United States', value: 95 }];

const AuthorizedServicePartnerForm = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [partnerData, setPartnerData] = useState({});
  const { state } = useLocation();
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const getPartnerData = useCallback(async (data) => {
    setPartnerData(data);
    const result = await getStates();
    if (result) {
      setStates(result);
    }
    const cities = await getCities(data?.stateData?.id);
    if (cities) {
      setCities(cities);
    }
  }, []);
  useEffect(() => {
    if (userId) {
      getPartnerData(state);
    }
  }, [getPartnerData, userId, state]);

  const handleSubmitForm = async (values) => {
    let response;
    const body = {
      ...values,
      state: values.state.id,
      country: values.country.value,
      city: values.city.id,
    };
    if (userId) {
      response = await editPartner(body, userId);
    } else {
      response = await createPartner(body);
    }
    if (response) {
      navigate('/service-partner');
    }
  };

  const handleCountryOpen = async (selectedCountry) => {
    formik.setFieldValue('country', selectedCountry);

    const result = await getStates();
    setStates(result);
  };
  const handleStatesOpen = async (selectedState) => {
    formik.setFieldValue('state', selectedState);
    formik.setFieldValue('city', null);
    const result = await getCities(selectedState?.id);
    setCities(result);
  };

  const validateMaxLength = (fieldName, maxLength) =>
    Yup.string().max(maxLength, `${fieldName} must be at most ${maxLength} characters`);

  const validationSchema = Yup.object().shape({
    companyName: validateMaxLength('Company name', 100).required('Company name is required'),
    companyEmail: validateMaxLength('Email', 30)
      .email('Invalid email address')
      .required('Email is required'),
    companyPhone: Yup.string()
      .matches(/^\+?\d+$/, 'Phone number must contain only digits')
      .min(11, 'Phone number must be at least 11 digits')
      .max(15, 'Phone number must be at most 15 digits')
      .required('Phone number is required'),

    is_active: Yup.boolean().optional(),
    city: Yup.mixed().required('City is required'),
    state: Yup.mixed().required('State is required'),
    country: Yup.mixed().required('Country is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      companyName: partnerData.company_name ?? '',
      companyEmail: partnerData.email ?? '',
      companyPhone: partnerData.phone_number ?? '',
      is_active: partnerData.is_active ?? false,
      logo: partnerData.logo ?? { url: '', file: null },
      city: partnerData.cityData ?? null,
      state: partnerData.stateData ?? null,
      country: partnerData.countryData ?? null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleReset = useCallback(() => {
    navigate('/service-partner');
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue('logo', {
          url: reader.result,
          file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
        <Typography variant="h3">{!userId ? 'Add Partner' : 'Update Partner'}</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Company Name:</Typography>
            <TextField
              fullWidth
              id="companyName"
              variant="outlined"
              value={formik.values?.companyName}
              onChange={formik.handleChange('companyName')}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Company Email:
            </Typography>
            <TextField
              fullWidth
              id="companyEmail"
              type="email"
              variant="outlined"
              value={formik.values?.companyEmail}
              onChange={formik.handleChange('companyEmail')}
              error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
              helperText={formik.touched.companyEmail && formik.errors.companyEmail}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Company Phone:
            </Typography>
            <TextField
              fullWidth
              id="companyPhone"
              variant="outlined"
              value={formik.values?.companyPhone}
              onChange={formik.handleChange('companyPhone')}
              error={formik.touched.companyPhone && Boolean(formik.errors.companyPhone)}
              helperText={formik.touched.companyPhone && formik.errors.companyPhone}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Country:</Typography>
            <Autocomplete
              fullWidth
              id="country"
              name="country"
              options={countries}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              value={countries.length ? formik.values?.country : null}
              onChange={(event, newValue) => {
                if (newValue) {
                  handleCountryOpen(newValue);
                } else {
                  handleCountryOpen(null);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                />
              )}
              sx={{ mt: 3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>State:</Typography>
            <Autocomplete
              fullWidth
              id="state"
              name="state"
              options={states}
              getOptionLabel={(option) => option.name ?? ''}
              getOptionKey={(option) => option.id ?? 0}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              value={states.length ? formik.values?.state : null}
              onChange={(event, newValue) => {
                setCities([]);
                if (newValue) {
                  handleStatesOpen(newValue);
                } else {
                  handleStatesOpen(null);
                }
              }}
              disabled={!states?.length}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              )}
              sx={{ mt: 3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>City:</Typography>
            <Autocomplete
              fullWidth
              id="city"
              name="city"
              options={cities}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option.id}
              value={cities ? formik.values?.city : null}
              onChange={(event, newValue) => {
                if (newValue) {
                  formik.setFieldValue('city', newValue);
                } else {
                  formik.setFieldValue('city', null);
                }
              }}
              disabled={!cities?.length}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              )}
              sx={{ mt: 3 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ mt: 1.2, ml: 2 }}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Active:</Typography>
              <RadioGroup
                sx={{ mt: 2.5 }}
                aria-label="isActive"
                name="is_active"
                value={formik.values?.is_active}
                onChange={(event) => {
                  formik.setFieldValue('is_active', event.target.value);
                }}
                row
              >
                <FormControlLabel value={true} control={<Radio color="primary" />} label="Yes" />
                <FormControlLabel value={false} control={<Radio color="primary" />} label="No" />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Company Logo:</Typography>
            <Box sx={{}}>
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ccc',
                  position: 'relative',
                }}
              >
                <IconButton
                  component="label"
                  sx={{
                    position: 'absolute',
                    right: -5,
                    top: -5,
                    zIndex: 10,
                    bgcolor: '#ffffff',
                    '&:hover': { bgcolor: '#F0F0F0' },
                  }}
                >
                  <AddIcon />
                  <input type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                </IconButton>

                <Avatar
                  alt="Uploaded"
                  src={formik.values?.logo?.url}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          type="button"
          variant="outlined"
          size="large"
          sx={{ mr: 2, bgcolor: 'white', color: 'black', border: 'white' }}
          onClick={handleReset}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          startIcon={<CheckIcon />}
        >
          {userId ? 'update' : 'add'}
        </Button>
      </Box>
    </form>
  );
};

export default AuthorizedServicePartnerForm;
