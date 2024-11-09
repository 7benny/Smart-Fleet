import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { VehicleContext } from '../../context/VehicleContext';
import VehicleForm from './VehicleForm';

const VehicleItem = ({ vehicle }) => {
  const { deleteVehicle } = useContext(VehicleContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteVehicle(vehicle.id);
      setOpenDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {vehicle.make} {vehicle.model}
        </Typography>
        <Typography color="text.secondary">Year: {vehicle.year}</Typography>
        <Typography color="text.secondary">Status: {vehicle.status}</Typography>
        <Typography color="text.secondary">Battery Level: {vehicle.batteryLevel}%</Typography>
        {vehicle.location && (
          <Typography color="text.secondary">
            Location: ({vehicle.location.latitude}, {vehicle.location.longitude})
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={() => setOpenEdit(true)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => setOpenDelete(true)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          <VehicleForm vehicle={vehicle} handleClose={() => setOpenEdit(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {vehicle.make} {vehicle.model}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default VehicleItem;
