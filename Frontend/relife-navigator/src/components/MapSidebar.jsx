import React, { useState } from 'react';

const MapSidebar = ({ services }) => {
  const [search, setSearch] = useState('');

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Nearby Services</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search services..."
        className="w-full p-2 rounded bg-gray-700 text-white mb-4"
      />
      <ul>
        {filteredServices.map(service => (
          <li key={service.id} className="mb-2">
            <div className="bg-gray-700 p-2 rounded-lg">
              <h3 className="font-bold">{service.name}</h3>
              <p>{service.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapSidebar;