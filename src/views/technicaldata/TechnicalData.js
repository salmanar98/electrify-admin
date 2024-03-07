import { Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import TechnicalDataForm from './TechnicalDataForm';

const TechnicalData = () => {
  return (
    <PageContainer title="Technical Data" description="this is Technical Data page">
      <Box
        component="div"
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
        alignItems={{ xs: 'start', sm: 'end' }}
      >
        <Box component="div" mb={{ xs: 2, sm: 0, }} sx={{marginLeft:1, marginTop:1}}>
          <Typography variant="h3">Data</Typography>
        </Box>
      </Box>
      <TechnicalDataForm />
    </PageContainer>
  );
};

export default TechnicalData;
