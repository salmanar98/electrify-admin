import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useSelector } from 'react-redux';

const ConfirmationDialoge = ({
  title,
  dialogText,
  buttonText,
  handleConfirmation,
  closeDialog,
}) => {
  const loading = useSelector((state) => state.Alerts.beatLoader);
  return (
    <div>
      <Dialog fullWidth onClose={closeDialog} aria-labelledby="customized-dialog-title" open={true}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <ErrorOutlineOutlinedIcon color="primary" sx={{ fontSize: '50px' }} />
          <Typography pt={2} sx={{ fontSize: 16, fontWeight: 'bold' }}>
            {title ?? 'Confirmation'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography>{dialogText ?? ''}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ color: '#000000', mr: 3 }}
            onClick={closeDialog}
            disabled={Boolean(loading)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: '700 !important' }}
            onClick={handleConfirmation}
            disabled={Boolean(loading)}
            autoFocus
          >
            {buttonText ?? 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialoge;
