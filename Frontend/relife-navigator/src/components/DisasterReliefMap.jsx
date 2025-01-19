import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapFilters from './MapFilters';
import MapSidebar from './MapSidebar';

const services = [
  { id: 1, name: 'Shelter 1', type: 'shelter', position: [37.7749, -122.4194], address: '123 Shelter St' },
  { id: 2, name: 'Hospital 1', type: 'hospital', position: [37.7849, -122.4094], address: '456 Hospital Ave' },
  { id: 3, name: 'Food Distribution 1', type: 'food', position: [37.7949, -122.4294], address: '789 Food Blvd' },
];

const icon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DisasterReliefMap = () => {
  const [filters, setFilters] = useState({
    shelter: true,
    hospital: true,
    food: true,
  });

  const handleToggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const filteredServices = services.filter(service => filters[service.type]);

  return (
    <div className="disaster-relief-map bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto flex">
        <div className="w-1/4">
          <MapFilters filters={filters} onToggle={handleToggleFilter} />
          <MapSidebar services={filteredServices} />
        </div>
        <div className="w-3/4">
          <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredServices.map(service => (
              <Marker key={service.id} position={service.position} icon={icon}>
                <Popup>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default DisasterReliefMap;