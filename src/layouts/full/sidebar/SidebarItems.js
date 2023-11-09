import React, { Fragment } from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, Divider, List } from '@mui/material';
import NavItem from './NavItem';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 0 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item, i) => (
          <Fragment key={i}>
            <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            {item.hasBorder ? <Divider variant="fullWidth" sx={{ my: 1 }} /> : null}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
export default SidebarItems;
