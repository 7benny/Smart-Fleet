import React, { useContext } from 'react';
import { VehicleContext } from '../../context/VehicleContext';
import { Grid, Typography } from '@mui/material';
import VehicleItem from './VehicleItem';

const VehicleList = () => {
  const { vehicles } = useContext(VehicleContext);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Your Vehicles
      </Typography>
      <Grid container spacing={2}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
            <VehicleItem vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VehicleList;
