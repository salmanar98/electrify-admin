import { Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import SettingsFormContainer from './SettingsFormContainer';

const Settings = () => {
  return (
    <PageContainer title="Settings" description="this is Settings page">
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'start', sm: 'center' }}
      >
        <Box component="div" mb={{ xs: 2, sm: 0 }} sx={{marginLeft:1, marginTop:1}}>
          <Typography variant="h3"> Settings</Typography>
        </Box>
      </Box>
      <SettingsFormContainer />
    </PageContainer>
  );
};

export default Settings;
