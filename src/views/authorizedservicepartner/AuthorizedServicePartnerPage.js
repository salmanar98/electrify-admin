import { Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BackButton from 'src/shared/BackButton';
import AuthorizedServicePartnerForm from './AuthorizedServicePartnerForm';
const AuthorizedServicePartnerPage = () => {
  return (
    <PageContainer title="Add Device" description="this is adding dealer page">
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'start', sm: 'center' }}
      >
        <Box component="div" mb={{ xs: 2, sm: 0 }}>
          <Typography variant="h3">
            {' '}
            <BackButton /> Partner
          </Typography>
        </Box>
      </Box>
      <AuthorizedServicePartnerForm />
    </PageContainer>
  );
};

export default AuthorizedServicePartnerPage;
