import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Alert } from '@mui/material';
import { VehicleContext } from '../../context/VehicleContext';

const VehicleForm = ({ vehicle, handleClose }) => {
  const isEdit = Boolean(vehicle);
  const { addVehicle, updateVehicle } = useContext(VehicleContext);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    status: 'active',
    batteryLevel: 100,
    latitude: '',
    longitude: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        status: vehicle.status,
        batteryLevel: vehicle.batteryLevel,
        latitude: vehicle.location ? vehicle.location.latitude : '',
        longitude: vehicle.location ? vehicle.location.longitude : '',
      });
    }
  }, [isEdit, vehicle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        status: formData.status,
        batteryLevel: parseFloat(formData.batteryLevel),
        location:
          formData.latitude && formData.longitude
            ? {
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
              }
            : null,
      };

      if (isEdit) {
        await updateVehicle(vehicle.id, data);
      } else {
        await addVehicle(data);
      }
      handleClose();
    } catch (errMsg) {
      setError(errMsg);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Make"
        name="make"
        fullWidth
        margin="normal"
        value={formData.make}
        onChange={handleChange}
        required
      />
      <TextField
        label="Model"
        name="model"
        fullWidth
        margin="normal"
        value={formData.model}
        onChange={handleChange}
        required
      />
      <TextField
        label="Year"
        name="year"
        type="number"
        fullWidth
        margin="normal"
        value={formData.year}
        onChange={handleChange}
        required
      />
      <TextField
        select
        label="Status"
        name="status"
        fullWidth
        margin="normal"
        value={formData.status}
        onChange={handleChange}
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
        <MenuItem value="maintenance">Maintenance</MenuItem>
      </TextField>
      <TextField
        label="Battery Level (%)"
        name="batteryLevel"
        type="number"
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 100, step: 0.1 }}
        value={formData.batteryLevel}
        onChange={handleChange}
      />
      <TextField
        label="Latitude"
        name="latitude"
        type="number"
        fullWidth
        margin="normal"
        value={formData.latitude}
        onChange={handleChange}
      />
      <TextField
        label="Longitude"
        name="longitude"
        type="number"
        fullWidth
        margin="normal"
        value={formData.longitude}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {isEdit ? 'Update Vehicle' : 'Add Vehicle'}
      </Button>
    </Box>
  );
};

export default VehicleForm;
