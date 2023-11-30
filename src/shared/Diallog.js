import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialogs = (props) => {
  const { title, dialogText, buttonText, handleClose, children } = props;

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 0, pt: 3, textAlign: 'center', fontSize: 16 }}>
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 4 }}>
        {dialogText ? <Typography>{dialogText}</Typography> : null}
        {children}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ color: '#000000' }}
          autoFocus
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: '700 !important' }}
          // onClick={() => handleConfirmation(data.data.id)}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomizedDialogs;
