import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { io } from 'socket.io-client';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchVehicles = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:5001/vehicles', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setVehicles(res.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchVehicles();

      const newSocket = io('http://localhost:5001');
      setSocket(newSocket);

      newSocket.on('newVehicle', (vehicle) => {
        setVehicles((prev) => [...prev, vehicle]);
      });

      newSocket.on('updateVehicle', (updatedVehicle) => {
        setVehicles((prev) =>
          prev.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle))
        );
      });

      newSocket.on('deleteVehicle', ({ id }) => {
        setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isAuthenticated]);

  const addVehicle = async (vehicleData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5001/vehicles', vehicleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    } catch (error) {
      throw error.response.data.msg || 'Failed to add vehicle';
    }
  };

  const updateVehicle = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5001/vehicles/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error.response.data.msg || 'Failed to update vehicle';
    }
  };

  const deleteVehicle = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error.response.data.msg || 'Failed to delete vehicle';
    }
  };

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle, updateVehicle, deleteVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};
