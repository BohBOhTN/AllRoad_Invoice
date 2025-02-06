import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemForm from '../components/ItemForm';

const mockItems = [
  { id: 1, name: 'Item 1', description: 'Description 1' },
  { id: 2, name: 'Item 2', description: 'Description 2' },
  // Add more mock items here
];

export default function ItemsPage() {
  const [items, setItems] = useState(mockItems);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (item = null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Items</h1>
      <div className="my-4 flex items-center">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button onClick={() => openModal()} className="ml-4 bg-blue-500 text-white p-2 rounded">Add Item</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border text-center">Name</th>
            <th className="py-2 px-4 border text-center">Description</th>
            <th className="py-2 px-4 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border text-center">{item.name}</td>
              <td className="py-2 px-4 border text-center">{item.description}</td>
              <td className="py-2 px-4 border text-center flex justify-center space-x-2">
                <button onClick={() => openModal(item)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <ItemForm item={selectedItem} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
