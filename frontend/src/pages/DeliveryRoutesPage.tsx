import React, { useState, useEffect } from 'react';
import DeliveryRouteForm from '../components/DeliveryRouteForm';

const mockRoutes = [
  { id: 1, code: '74', name: 'Route One' },
  { id: 2, code: '75', name: 'Route Two' },
  { id: 3, code: '76', name: 'Route Three' },
];

export default function DeliveryRoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    // Simulate an API call with mock data
    setRoutes(mockRoutes);
  };

  const deleteRoute = async (id) => {
    // Simulate deleting a route
    setRoutes(routes.filter(route => route.id !== id));
  };

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (route = null) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoute(null);
    fetchRoutes();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Delivery Routes</h1>
      <div className="my-4 flex items-center">
        <input
          type="text"
          placeholder="Search routes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button onClick={() => openModal()} className="ml-4 bg-blue-500 text-white p-2 rounded">Add Route</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border text-center">Code</th>
            <th className="py-2 px-4 border text-center">Name</th>
            <th className="py-2 px-4 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoutes.map(route => (
            <tr key={route.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border text-center">{route.code}</td>
              <td className="py-2 px-4 border text-center">{route.name}</td>
              <td className="py-2 px-4 border text-center flex justify-center space-x-2">
                <button onClick={() => openModal(route)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                <button onClick={() => deleteRoute(route.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <DeliveryRouteForm route={selectedRoute} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
