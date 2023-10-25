'use client';
import { Box, Typography } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';

const SliderStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  height: '100%',
  padding: '20px',
  width: '100%',
  textAlign: 'center',
};

const SwiperSlideElement = ({ image, name, description }) => {
  return (
    <Box component="div" sx={SliderStyles}>
      <Box component="img" src={image} alt={name} width={'65%'} />
      <Typography variant="h5" mt={4}>
        {name}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};
export default SwiperSlideElement;
