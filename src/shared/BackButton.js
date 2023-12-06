import IconButton from '@mui/material/IconButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router';

const BackButton = () => {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };
  return (
    <IconButton
      color="primary"
      aria-label="back"
      onClick={handleNavigateBack}
      sx={{
        p: 1,
        bgcolor: "#dcdce3",
        borderRadius: 3,
        '&:hover': {
          bgcolor: "#e6e6f0",       },
      }}
    >
      <ArrowBackOutlinedIcon />
    </IconButton>
  );
};

export default BackButton;
