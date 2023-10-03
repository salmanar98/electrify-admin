import React from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import logo from 'src/assets/images/logos/logo1.png';
import SwiperSlideElement from './SwiperSlide';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { LoginSliders } from '../utilities/helpers';
import { Pagination } from 'swiper/modules';
import LoginForm from './LoginForm';

const Login2 = () => (
  <PageContainer title="Login" description="this is login page">
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
                <img src={logo} alt="logogo" />
              </Box>

              <Typography
                variant="h2"
                textAlign="center"
                color="#32324D"
                fontSize={32}
                fontWeight={550}
                pt={2}
                mb={1}
              >
                Welcome! MEOW
              </Typography>

              <Typography
                variant="subtitle2"
                textAlign="center"
                color="#666687"
                fontSize={18}
                fontWeight={400}
                mb={1}
              >
                Sign in with your Electrafy login credentials
              </Typography>
              <LoginForm />
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
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                return `<span class="${className}" style="background-color: #E0EAFF;"></span>`;
              },
            }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            modules={[Pagination]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            style={{ height: '100vh', background: '#000068' }}
          >
            {LoginSliders.map((slide) => (
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

export default Login2;
