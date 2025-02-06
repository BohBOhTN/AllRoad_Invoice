import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClientForm from '../components/ClientForm';

const mockClients = [
  { id: 1, name: 'Client One', email: 'clientone@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Client Two', email: 'clienttwo@example.com', phone: '234-567-8901' },
  { id: 3, name: 'Client Three', email: 'clientthree@example.com', phone: '345-678-9012' },
];

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    // Simulate an API call with mock data
    setClients(mockClients);
  };

  const deleteClient = async (id) => {
    // Simulate deleting a client
    setClients(clients.filter(client => client.id !== id));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (client = null) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
    fetchClients();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
      <div className="my-4 flex items-center">
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button onClick={() => openModal()} className="ml-4 bg-blue-500 text-white p-2 rounded">Add Client</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border text-center">Name</th>
            <th className="py-2 px-4 border text-center">Email</th>
            <th className="py-2 px-4 border text-center">Phone</th>
            <th className="py-2 px-4 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border text-center">{client.name}</td>
              <td className="py-2 px-4 border text-center">{client.email}</td>
              <td className="py-2 px-4 border text-center">{client.phone}</td>
              <td className="py-2 px-4 border text-center flex justify-center space-x-2">
                <button onClick={() => openModal(client)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                <button onClick={() => deleteClient(client.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <ClientForm client={selectedClient} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
