import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { SettingsDataListing } from 'src/ApiCalls/SettingsApiCalls';
import { SettingsDataUpdate } from 'src/ApiCalls/SettingsApiCalls';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setSettingData } from 'src/reducers/slices/setting';
import { dispatch } from 'src/reducers/configureStore';

const batteryPercentOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const batteryCapacityOptions = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
];

const SettingsFormContainer = () => {
  const [batteryNotify, setBatteryNotify] = useState('');
  const [stateChangeNotify, setStateChangeNotify] = useState('');
  const [settingsId, setSettingsId] = useState('');
  const loading = useSelector((state) => state.Alerts.beatLoader);
  const settings = useSelector((state) => state.setting.settingData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!settings) {
          const response = await SettingsDataListing();
          if (response) {
            dispatch(setSettingData(response));
          }
        } else {
          setBatteryNotify(settings.notify_when_battery_is);
          setSettingsId(settings.id);
          setStateChangeNotify(settings.notify_when_battery_state_change);
        }
      } catch (error) {
        console.error('Error fetching settings data:', error);
      }
    };

    fetchData();
  }, [settings]);

  const handleBatteryNotifyChange = (event) => {
    setBatteryNotify(event.target.value);
  };

  const handleStateChangeNotifyChange = (event) => {
    setStateChangeNotify(event.target.value);
  };

  const handleUpdate = async () => {
    const response = await SettingsDataUpdate({ batteryNotify, stateChangeNotify }, settingsId);
    if (response) {
      dispatch(setSettingData(response));
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: '#ffffff',
          marginTop: { xs: 4, sm: 8 },
          padding: { xs: 3, sm: 6 },
          borderRadius: 6,
          position: 'relative',
        }}
      >
        <Typography variant="h3">Device Notifications</Typography>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Trigger Notification when Battery Capacity is:
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={batteryNotify}
              id="batteryPercent"
              onChange={handleBatteryNotifyChange}
            >
              {batteryPercentOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}%
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={{ color: 'black', fontWeight: '450', mb: 1 }}>
              Trigger Notification if System State Changes{' '}
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={stateChangeNotify}
              id="batteryCapacity"
              onChange={handleStateChangeNotifyChange}
            >
              {batteryCapacityOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CheckIcon />}
          color="primary"
          onClick={handleUpdate}
          disabled={Boolean(loading)}
        >
          Update
        </Button>
      </Box>
    </>
  );
};

export default SettingsFormContainer;
