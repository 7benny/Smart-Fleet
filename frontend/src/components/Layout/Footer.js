import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Smart Fleet Management System
      </Typography>
    </Box>
  );
};

export default Footer;
