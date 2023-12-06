import { Typography } from '@mui/material';
import { memo } from 'react';

const StatusRenderer = ({ value }) => {
  const activeStyles = {
    border: '1px solid #C6F0C2',
    backgroundColor: '#EAFBE7',
    color: '#2F6846',
  };

  const inactiveStyles = {
    border: '2px solid #F0C2C2',
    backgroundColor: '#ECE2E2',
    color: '#DF6666',
  };

  const styles = isNaN(value)
    ? value.toLowerCase() === 'active' || value.toLowerCase() === 'true'
      ? activeStyles
      : inactiveStyles
    : parseInt(value) === 0
    ? inactiveStyles
    : value === true || value === 1
    ? activeStyles
    : inactiveStyles;

  return value !== null && value !== undefined ? (
    <Typography
      variant="caption"
      sx={{
        padding: '4.5px',
        borderRadius: 1,
        fontWeight: '400',
        ...styles,
      }}
    >
      {isNaN(value)
        ? value.toUpperCase()
        : value === false || value === 'false' || value === 0
        ? 'INACTIVE'
        : value === true || value === 'true' || value === 1
        ? 'ACTIVE'
        : null}
    </Typography>
  ) : null;
};

export default memo(StatusRenderer);
