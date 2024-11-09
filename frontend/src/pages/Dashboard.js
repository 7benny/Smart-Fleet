import React, { useContext, useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, Grid } from '@mui/material';
import { VehicleContext } from '../context/VehicleContext';
import VehicleList from '../components/Vehicles/VehicleList';
import VehicleForm from '../components/Vehicles/VehicleForm';
import VehicleMap from '../components/Vehicles/VehicleMap';

const Dashboard = () => {
  const { addVehicle } = useContext(VehicleContext);
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAdd} sx={{ mb: 2 }}>
        Add Vehicle
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <VehicleList />
        </Grid>
        <Grid item xs={12} md={6}>
          <VehicleMap />
        </Grid>
      </Grid>

      {/* Add Vehicle Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent>
          <VehicleForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
