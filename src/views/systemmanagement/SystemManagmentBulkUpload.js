import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BackButton from 'src/shared/BackButton';
import Papa from 'papaparse';
import { LoadingButton } from '@mui/lab';
import { DeviceManagementTableColDef1 } from '../utilities/helpers';
import ImportSystemManagmentTable from './ImportSystemManagmentTable';

const ServicePartnerBulkUpload = () => {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowsData, setRowsData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (acceptedFiles) => {
    if (acceptedFiles[0].type !== 'text/csv') {
      setErrorMessage('Invalid file format. Only CSV files are supported.');
    } else {
      setErrorMessage('');

      Papa.parse(acceptedFiles[0], {
        skipEmptyLines: true,
        complete: (results) => {
          const jsonData = results.data.slice(1).map((row) => {
            const rowData = {};
            results.data[0].forEach((column, columnIndex) => {
              rowData[column] = row[columnIndex];
            });

            return rowData;
          });

          const metaData = results.data[0];

          if (jsonData?.length) {
            setRowsData(jsonData);
            setColumnDefs(() => {
              const extractedColDefs = [];
              DeviceManagementTableColDef1.forEach((colDef) => {
                if (metaData.includes(colDef.field) || colDef.headerName === 'Actions') {
                  extractedColDefs.push(colDef);
                }
              });

              return extractedColDefs;
            });
          } else {
            setErrorMessage('The file does not contain the right data.');
          }
        },
        error: () => {
          setErrorMessage('Error parsing the CSV file.');
        },
      });
    }
  };

  const VisuallyHiddenInput = styled('input')({
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    opacity: 0,
    cursor: 'pointer',
  });

  return (
    <>
      <Box
        component="div"
        mb={{ xs: 2, sm: 0 }}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', sm: 'flex-start' },
          flexWrap: 'wrap',
        }}
      >
        <BackButton />
        <Typography
          variant="h3"
          sx={{ marginLeft: { xs: 0, sm: 1.5 }, marginTop: { xs: 1, sm: 0.7 } }}
        >
          System/
        </Typography>
        <Typography
          variant="h3"
          sx={{ marginTop: { xs: 1, sm: 0.7 }, color: '#000068', marginLeft: { xs: 0, sm: 1 } }}
        >
          Bulk Upload
        </Typography>
      </Box>
      <Container>
        <Box
          sx={{
            borderRadius: 2,
            mt: 12,
            border: '1px dashed rgba(2, 112, 184, 0.4)',
            bgcolor: 'rgba(2, 112, 184, 0.1)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <VisuallyHiddenInput
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(e.target.files)}
            />
            <Stack spacing={1} alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Upload File
              </Typography>
              <CloudUploadIcon color="primary" />
              <Typography variant="body1">Drag & drop or click to choose files</Typography>
              <Typography variant="body1">Supported Formats: CSV</Typography>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="../assets/system-managment-sample.csv" download="system-managment-sample.csv">
              <LoadingButton
                variant="contained"
                color="primary"
                startIcon={<ArrowDownwardIcon />}
                loadingPosition="start"
                type="submit"
              >
                Download Sample
              </LoadingButton>
            </a>
          </Box>
          <Divider />
          {errorMessage ? (
            <Typography style={{ color: 'red' }} sx={{ typography: { sm: 'h4', xs: 'subtitle2' } }}>
              {errorMessage}
            </Typography>
          ) : null}
          <Grid>
            {rowsData ? (
              <>
                <Typography variant="h3" component="h3" textAlign="center" pb={3}>
                  Review CSV Partners
                </Typography>
                <ImportSystemManagmentTable
                  rows={rowsData}
                  setRowData={setRowsData}
                  columnDefs={columnDefs}
                />
              </>
            ) : null}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ServicePartnerBulkUpload;
