import React from 'react';
import { AppBar, Toolbar, styled, Stack, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
// import Profile from './Profile';
import Logo from '../shared/logo/Logo';
import { IconMenu } from '@tabler/icons';
import BeatLoader from '../../../shared/BeatLoader';

const Header = (props) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    width: '100%',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '50px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    justifyContent: 'space-between',
  }));

  return (
    <AppBarStyled
      position="sticky"
      color="default"
      sx={{ borderBottom: 1, borderColor: '#EEEEEE', bgcolor: '#FFFFFF' }}
    >
      <ToolbarStyled>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            width: 30,
            height: 30,
            marginBottom: 1,
            display: {
              lg: 'inline',
              xs: 'none',
            },
          }}
        >
          <Logo />
        </Stack>
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconButton color="inherit" aria-label="menu" onClick={props.toggleMobileSidebar}>
            <IconMenu width="20" height="20" />
          </IconButton>
        </Stack>
        <BeatLoader />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              ...(typeof anchorEl2 === 'object' && {
                color: 'primary.main',
              }),
            }}
          ></IconButton>
          <Profile /> */}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
