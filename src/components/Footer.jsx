import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f5f5f5',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Your Event Manager. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
