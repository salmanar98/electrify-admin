import React, { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Typography, Button, Autocomplete, MenuItem, Select } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ListPartners } from 'src/ApiCalls/AuthorizedServicePartnerApiCalls';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ListModels, createSystem, editSystem } from 'src/ApiCalls/SystemMangementApiCalls';
import { setTechnicalData } from 'src/reducers/slices/technicalData';
import { dispatch } from 'src/reducers/configureStore';
import { useSelector } from 'react-redux';
const AddSystemForm = () => {
  const [authorizedPartners, setAuthorizedPartners] = useState([]);
  const [model, setModel] = useState(null);
  const [systemData, setSystemData] = useState({});
  const { state } = useLocation();
  const { id: systemID } = useParams();
  const technicalData = useSelector((state) => state.technical.technicalData);
  const initialValues = {
    modelNumber: systemData?.modelData?.id ?? '',
    authorizedPartner: systemData?.servicePartnerData ?? null,
    serialNumber: systemData?.serialNumber ?? '',
    macAddress: systemData?.MACAddress ?? '',
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    modelNumber: Yup.string()
      .max(50, 'Model number must be at most 50 characters')
      .required('Model number is required'),
    authorizedPartner: Yup.mixed().required('Authorized partner is required'),

    serialNumber: Yup.string()
      .max(50, 'Serial number must be at most 50 characters')
      .required('Serial number is required'),
    macAddress: Yup.string()
      .max(50, 'MAC address must be at most 50 characters')
      .required('MAC address is required'),
  });

  const handleForm = async (values) => {
    let response;
    if (systemID) {
      response = await editSystem(values, systemID);
    } else {
      response = await createSystem(values);
    }
    if (response) {
      navigate('/system-managment');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleForm(values);
    },
  });

  const handleReset = useCallback(() => {
    navigate('/system-managment');
  }, [navigate]);

  useEffect(() => {
    const fetchModels = async () => {
      if (!technicalData) {
        const response = await ListModels();
        if (response) {
          dispatch(setTechnicalData(response));
        }
      } else {
        setModel(technicalData);
      }
    };
    fetchModels();
  }, [technicalData]);

  useEffect(() => {
    const fetchAuthorizedPartners = async () => {
      try {
        const partners = await ListPartners();
        setAuthorizedPartners(partners.data);
      } catch (error) {
        console.error('Listing failed:', error);
      }
    };
    if (systemID) {
      setSystemData(state);
    }

    fetchAuthorizedPartners();
  }, [setSystemData, systemID, state]);

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
          <Typography variant="h3"> {!systemID ? 'Add System' : 'Update System'}</Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
                Model Number:
              </Typography>
              <Select
                fullWidth
                id="modelNumber"
                name="modelNumber"
                variant="outlined"
                value={model?.length ? formik.values.modelNumber : ''}
                onChange={formik.handleChange}
                error={formik.touched.modelNumber && Boolean(formik.errors.modelNumber)}
                displayEmpty
              >
                {model?.map((option) => (
                  <MenuItem key={option.model_number} value={option.id}>
                    {option.model_number}
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
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
                Authorized Service Partner:
              </Typography>
              <Autocomplete
                fullWidth
                id="authorizedPartner"
                name="authorizedPartner"
                options={authorizedPartners}
                getOptionLabel={(option) => option?.company_name ?? ''}
                getOptionKey={(option) => option.id ?? 0}
                isOptionEqualToValue={(option, value) => option.id === value?.id ?? value}
                value={authorizedPartners.length ? formik.values.authorizedPartner : null}
                onChange={(event, newValue) => {
                  if (newValue) {
                    formik.setFieldValue('authorizedPartner', newValue);
                  } else {
                    formik.setFieldValue('authorizedPartner', null);
                  }
                }}
                disabled={!authorizedPartners?.length}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    id="authorizedPartner"
                    name="authorizedPartner"
                    error={
                      formik.touched.authorizedPartner && Boolean(formik.errors.authorizedPartner)
                    }
                    helperText={formik.touched.authorizedPartner && formik.errors.authorizedPartner}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
                Serial Number:
              </Typography>
              <TextField
                fullWidth
                id="serialNumber"
                name="serialNumber"
                variant="outlined"
                value={formik.values.serialNumber}
                onChange={formik.handleChange}
                error={formik.touched.serialNumber && Boolean(formik.errors.serialNumber)}
                helperText={formik.touched.serialNumber && formik.errors.serialNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
                MAC Address:
              </Typography>
              <TextField
                fullWidth
                id="macAddress"
                name="macAddress"
                variant="outlined"
                value={formik.values.macAddress}
                onChange={formik.handleChange}
                error={formik.touched.macAddress && Boolean(formik.errors.macAddress)}
                helperText={formik.touched.macAddress && formik.errors.macAddress}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={handleReset}
            sx={{ mr: 2 }}
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
            {!systemID ? 'Add ' : 'Update '}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddSystemForm;
