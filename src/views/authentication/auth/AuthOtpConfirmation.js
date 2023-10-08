import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import OTPInput from 'react-otp-input';
import '../styles.css';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { verifyOtp } from 'src/ApiCalls/AuthApiCalls';
// import { useNavigate } from 'react-router';
// import { useSelector } from 'react-redux';
// import { confirmOTP } from '../AuthHelpers';

const AuthOTPConfirmation = ({ title, subtitle, subtext, infotext }) => {
  const [OTP, setOTP] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp(OTP);
      if (response) {
        navigate('/auth/resetpassword', { state: response.data });
      }
    } catch (e) {
      console.error('could not verify OTP');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      {infotext}

      <Stack pt={3} pb={4}>
        <Box sx={{ zIndex: 10 }}>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle="inputStyle"
            containerStyle={{
              justifyContent: 'space-between',
            }}
          />
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <LoadingButton
          color="primary"
          variant="contained"
          sx={{
            borderRadius: '20px',
            width: '50%',
            margin: 'auto',
            '&:hover': {
              backgroundColor: '#000096',
            },
          }}
          fullWidth
          //   loading={loading}
          disabled={OTP.length !== 4}
          loadingIndicator="Submitting..."
          type="submit"
        >
          Verify
        </LoadingButton>
      </Box>
      {subtitle}
    </Box>
  );
};

export default AuthOTPConfirmation;
