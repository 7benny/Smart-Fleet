import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { VehicleContext } from '../../context/VehicleContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const VehicleMap = () => {
  const { vehicles } = useContext(VehicleContext);

  const vehiclesWithLocation = vehicles.filter((v) => v.location);

  const center = vehiclesWithLocation.length
    ? [vehiclesWithLocation[0].location.latitude, vehiclesWithLocation[0].location.longitude]
    : [51.505, -0.09]; 

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehiclesWithLocation.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.location.latitude, vehicle.location.longitude]}
        >
          <Popup>
            {vehicle.make} {vehicle.model} ({vehicle.year})<br />
            Status: {vehicle.status}<br />
            Battery Level: {vehicle.batteryLevel}%
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default VehicleMap;
