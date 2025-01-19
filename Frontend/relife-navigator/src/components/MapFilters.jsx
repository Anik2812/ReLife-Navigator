import React from 'react';

const MapFilters = ({ filters, onToggle }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      {Object.keys(filters).map((filter) => (
        <label key={filter} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={filters[filter]}
            onChange={() => onToggle(filter)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span className="ml-2">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
        </label>
      ))}
    </div>
  );
};

export default MapFilters;