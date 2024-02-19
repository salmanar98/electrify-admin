import { Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BackButton from 'src/shared/BackButton';
import AddBesiAdminForm from './AddBesiAdminForm.js';

const AddBesiAdminManagement = () => {
  return (
    <PageContainer title="Add Admin" description="this is adding device page">
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'start', sm: 'center' }}
      >
        <Box component="div" mb={{ xs: 2, sm: 0 }}>
          <Typography variant="h3"><BackButton /> BESI Admin</Typography>
        </Box>
      </Box>
      <AddBesiAdminForm />
    </PageContainer>
  );
};

export default AddBesiAdminManagement;
