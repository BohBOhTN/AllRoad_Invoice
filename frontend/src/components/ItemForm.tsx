import React, { useState, useEffect } from 'react';

const mockItems = [
  { id: 1, name: 'Item 1', description: 'Description 1', quantity: 10, price_ht: 100.00 },
  { id: 2, name: 'Item 2', description: 'Description 2', quantity: 5, price_ht: 50.00 },
  // Add more mock items here
];

export default function ItemForm({ item, onClose }) {
  const [formData, setFormData] = useState({ name: '', description: '', quantity: 0, price_ht: 0.00 });

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      // Update item logic here
    } else {
      // Create item logic here
    }
    onClose();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{item ? 'Edit Item' : 'Add Item'}</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price (HT)</label>
          <input
            type="number"
            step="0.01"
            name="price_ht"
            value={formData.price_ht}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">{item ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
}
