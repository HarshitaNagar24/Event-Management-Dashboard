// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react'; // Make sure useEffect & useState are imported
import { useLocation } from 'react-router-dom'; // Import useLocation
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box } from '@mui/material';
import CustomSnackbar from '../components/common/CustomSnackbar'; // Import your snackbar
import EventTable from '../components/EventTable';

const Dashboard = () => {
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (location.state?.fromLogin) {
      setSnackbar({ open: true, message: '✅ Login successful! Welcome.', severity: 'success' });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f9f9fb',
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <EventTable/>
      </Container>
      <Footer />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default Dashboard;