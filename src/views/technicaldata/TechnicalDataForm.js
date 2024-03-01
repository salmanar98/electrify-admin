import React, { useEffect } from 'react';
import { Box, Typography, Button, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import { TechnicalDataListing, TechnicalDataUpdate } from 'src/ApiCalls/TechnicalDataApiCalls';
import { useSelector, useDispatch } from 'react-redux';

import { setTechnicalData } from 'src/reducers/slices/technicalData';
const TechnicalDataForm = () => {
  const loading = useSelector((state) => state.Alerts.beatLoader);
  const dispatch = useDispatch();
  const technicalData = useSelector((state) => state.technical.technicalData);

  const validationSchema = Yup.object().shape({
    modelNumber: Yup.string().required('Model Number is required'),
    batteryCapacity: Yup.string().required('Battery Capacity is required'),
    continuousOutputPower: Yup.string().required('Continuous Output Power is required'),
    acSurge: Yup.string().required('AC Surge is required'),
    recommendedCircuitsDevices: Yup.string().required(
      'Recommended # of Circuits/Devices is required',
    ),
    operatingEnvironment: Yup.string().required('Operating Environment is required'),
    operatingTemperature: Yup.string().required('Operating Temperature is required'),
    approvals: Yup.string().required('Approvals is required'),
    limitedWarranty: Yup.string().required('Limited Warranty is required'),
  });

  const formik = useFormik({
    initialValues: {
      modelNumber: '',
      batteryCapacity: '',
      continuousOutputPower: '',
      acSurge: '',
      recommendedCircuitsDevices: '',
      operatingEnvironment: '',
      operatingTemperature: '',
      approvals: '',
      limitedWarranty: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await TechnicalDataUpdate(values);
      if (response) {
        const newData = technicalData.map((item) => {
          if (item.id === response.id) {
            return response;
          }
          return item;
        });
        dispatch(setTechnicalData(newData));
      }
    },
  });
  const handleModelNumberChange = (event) => {
    const selectedModelNumber = event.target.value;
    const selectedDevice = technicalData.find((device) => device.id === selectedModelNumber);
    if (selectedDevice) {
      formik.setValues({
        ...formik.values,
        batteryCapacity: selectedDevice.battery_capacity,
        continuousOutputPower: selectedDevice.continous_output_power,
        acSurge: selectedDevice.ac_surge,
        recommendedCircuitsDevices: selectedDevice.recomended_num_of_circuits_or_devices,
        operatingEnvironment: selectedDevice.operating_environment,
        operatingTemperature: selectedDevice.operating_temperature,
        approvals: selectedDevice.approvals,
        limitedWarranty: selectedDevice.limited_warranty,
      });
    }
    formik.handleChange(event);
  };
  useEffect(() => {
    (async () => {
      if (!technicalData) {
        const response = await TechnicalDataListing();
        if (response) {
          dispatch(setTechnicalData(response));
        }
      }
    })();
  }, [dispatch, technicalData]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          bgcolor: '#ffffff',
          marginTop: { xs: 4, sm: 4 },
          padding: { xs: 3, sm: 6 },
          borderRadius: 6,
          position: 'relative',
        }}
      >
        <Typography variant="h3">Technical Specs</Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Model Number:</Typography>
            <Select
              fullWidth
              id="modelNumber"
              name="modelNumber"
              variant="outlined"
              value={formik.values.modelNumber}
              onChange={handleModelNumberChange}
              error={formik.touched.modelNumber && Boolean(formik.errors.modelNumber)}
            >
              {technicalData?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.model_number}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.modelNumber && formik.errors.modelNumber ? (
              <Typography variant="caption" color="error">
                {formik.errors.modelNumber}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}></Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Battery Capacity:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.batteryCapacity}
              onChange={formik.handleChange}
              id="batteryCapacity"
              error={formik.touched.batteryCapacity && Boolean(formik.errors.batteryCapacity)}
              helperText={formik.touched.batteryCapacity && formik.errors.batteryCapacity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Continuous Output Power:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.continuousOutputPower}
              onChange={formik.handleChange}
              id="continuousOutputPower"
              error={
                formik.touched.continuousOutputPower && Boolean(formik.errors.continuousOutputPower)
              }
              helperText={
                formik.touched.continuousOutputPower && formik.errors.continuousOutputPower
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>AC Surge:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.acSurge}
              onChange={formik.handleChange}
              id="acSurge"
              error={formik.touched.acSurge && Boolean(formik.errors.acSurge)}
              helperText={formik.touched.acSurge && formik.errors.acSurge}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Recommended # of Circuits/Devices:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.recommendedCircuitsDevices}
              onChange={formik.handleChange}
              id="recommendedCircuitsDevices"
              error={
                formik.touched.recommendedCircuitsDevices &&
                Boolean(formik.errors.recommendedCircuitsDevices)
              }
              helperText={
                formik.touched.recommendedCircuitsDevices &&
                formik.errors.recommendedCircuitsDevices
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Operating Environment:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.operatingEnvironment}
              onChange={formik.handleChange}
              id="operatingEnvironment"
              error={
                formik.touched.operatingEnvironment && Boolean(formik.errors.operatingEnvironment)
              }
              helperText={formik.touched.operatingEnvironment && formik.errors.operatingEnvironment}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Operating Temperature:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.operatingTemperature}
              onChange={formik.handleChange}
              id="operatingTemperature"
              error={
                formik.touched.operatingTemperature && Boolean(formik.errors.operatingTemperature)
              }
              helperText={formik.touched.operatingTemperature && formik.errors.operatingTemperature}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>Approvals:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.approvals}
              onChange={formik.handleChange}
              id="approvals"
              error={formik.touched.approvals && Boolean(formik.errors.approvals)}
              helperText={formik.touched.approvals && formik.errors.approvals}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Limited Warranty:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values.limitedWarranty}
              onChange={formik.handleChange}
              id="limitedWarranty"
              error={formik.touched.limitedWarranty && Boolean(formik.errors.limitedWarranty)}
              helperText={formik.touched.limitedWarranty && formik.errors.limitedWarranty}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<CheckIcon />}
          color="primary"
          disabled={Boolean(loading)}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default TechnicalDataForm;
