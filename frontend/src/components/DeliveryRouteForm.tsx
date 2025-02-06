import React, { useState, useEffect } from 'react';

const mockRoutes = [
  { id: 1, code: '74', name: 'Route One' },
  { id: 2, code: '75', name: 'Route Two' },
  { id: 3, code: '76', name: 'Route Three' },
];

export default function DeliveryRouteForm({ route, onClose }) {
  const [routeData, setRouteData] = useState({
    code: '',
    name: ''
  });

  useEffect(() => {
    if (route) {
      setRouteData(route);
    }
  }, [route]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({ ...routeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (route) {
      // Simulate updating a route
      const updatedRoutes = mockRoutes.map(r => r.id === route.id ? routeData : r);
      console.log('Updated Routes:', updatedRoutes);
    } else {
      // Simulate adding a new route
      const newRoute = { ...routeData, id: mockRoutes.length + 1 };
      const updatedRoutes = [...mockRoutes, newRoute];
      console.log('New Routes:', updatedRoutes);
    }
    onClose();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{route ? 'Edit Route' : 'Add Route'}</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Code</label>
          <input
            type="text"
            name="code"
            value={routeData.code}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={routeData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {route ? 'Update Route' : 'Add Route'}
        </button>
        <button type="button" onClick={onClose} className="ml-4 bg-gray-500 text-white p-2 rounded">
          Cancel
        </button>
      </form>
    </div>
  );
}
