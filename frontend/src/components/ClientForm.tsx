import React, { useState, useEffect } from 'react';

const mockClients = [
  { id: 1, name: 'Client One', address: '123 Main St', logo: '', email: 'clientone@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Client Two', address: '456 Elm St', logo: '', email: 'clienttwo@example.com', phone: '234-567-8901' },
  { id: 3, name: 'Client Three', address: '789 Oak St', logo: '', email: 'clientthree@example.com', phone: '345-678-9012' },
];

export default function ClientForm({ client, onClose }) {
  const [clientData, setClientData] = useState({
    name: '',
    address: '',
    logo: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (client) {
      setClientData(client);
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (client) {
      // Simulate updating a client
      const updatedClients = mockClients.map(c => c.id === client.id ? clientData : c);
      console.log('Updated Clients:', updatedClients);
    } else {
      // Simulate adding a new client
      const newClient = { ...clientData, id: mockClients.length + 1 };
      const updatedClients = [...mockClients, newClient];
      console.log('New Clients:', updatedClients);
    }
    onClose();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{client ? 'Edit Client' : 'Add Client'}</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={clientData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={clientData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={clientData.logo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={clientData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={clientData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {client ? 'Update Client' : 'Add Client'}
        </button>
        <button type="button" onClick={onClose} className="ml-4 bg-gray-500 text-white p-2 rounded">
          Cancel
        </button>
      </form>
    </div>
  );
}
