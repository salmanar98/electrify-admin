import { Box, Card, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChangePasswordSliders } from '../utilities/helpers';
import SwiperSlideElement from './SwiperSlide';
import AuthConfirmPassword from './auth/AuthConfirmPassword';
import './styles.css';

const OTPConfirmation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  return (
    <PageContainer title="Confirm Password" description="this is confirm password page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container justifyContent="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={9}
              sx={{
                px: { xs: 4, md: 10 },
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="div">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>
                <AuthConfirmPassword
                  token={token}
                  subtext={
                    <Typography
                      variant="h2"
                      textAlign="center"
                      color="#32324D"
                      fontSize={28}
                      fontWeight={600}
                      pt={2}
                      mb={1}
                    >
                      Change Password
                    </Typography>
                  }
                  infotext={
                    <Typography
                      variant="subtitle2"
                      textAlign="center"
                      color="#666687"
                      fontSize={17}
                      fontWeight={400}
                      mb={1}
                    >
                      Input your new desired password in the input fields below to create a new
                      password.
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            md={6}
            sx={{ display: { xs: 'none', md: 'block' } }}
            justifyContent="center"
            alignItems="center"
          >
            <Swiper
              pagination={true}
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              modules={[Pagination]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              style={{ height: '100vh', background: '#000063' }}
            >
              {ChangePasswordSliders.map((slide) => (
                <SwiperSlide key={`${slide.name}-login`}>
                  <SwiperSlideElement
                    image={slide.image}
                    name={slide.name}
                    description={slide.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default OTPConfirmation;
