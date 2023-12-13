import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileSize(file.size);
    }
  };

  // const handleUpload = async () => {
  //   setIsLoading(true);
  //   // Add your upload logic here
  // };

  const handleDelete = () => {
    setSelectedFile(null);
    setFileSize(0);
  };

  const getLimitedFileName = () => {
    if (selectedFile) {
      const text = selectedFile.name;
      if (text.length > 15) {
        return text.substring(0, 15) + '...';
      }
    }
    return selectedFile.name;
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
    <Container>
      <Box
        sx={{
          borderRadius: 2,
          mt: 2,
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
          <VisuallyHiddenInput type="file" accept=".jpeg" onChange={handleFileChange} />

          <Stack spacing={1} alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Upload File
            </Typography>
            <CloudUploadIcon color="primary" />
            <Typography variant="body1">Drag & drop or click to choose files</Typography>
            <Typography variant="body1">
              Supported Formats:JPEG,PNG,GIF,MP4,PSD,AI,Word,PPT
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        {selectedFile && (
          <Grid container>
            <Grid item xs={12} md={10}>
              <Stack spacing={1}>
                <Typography>{getLimitedFileName()}</Typography>
                <Stack direction="row" spacing={2}>
                  <Typography>{selectedFile.type}</Typography>
                  <Divider orientation="vertical" variant="middle" />
                  <Typography>{fileSize} byts</Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={2}>
              <Stack direction="row">
                <Button
                  variant="outlined"
                  sx={{ float: 'right' }}
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                {/* <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  onClick={handleUpload}
                  endIcon={<SendIcon />}
                >
                  Send
                </LoadingButton> */}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default FileUploader;
