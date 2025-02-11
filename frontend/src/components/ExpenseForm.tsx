import React, { useState } from 'react';
import { Modal } from './Modal';

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

export function ExpenseForm({ isOpen, onClose, categories }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ amount, category, bankAccount, description });
    // Submit expense data here
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setBankAccount('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Expense">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Account
          </label>
          <select
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select bank account</option>
            <option value="Bank A">Bank A</option>
            <option value="Bank B">Bank B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter description"
          />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Expense
          </button>
        </div>
      </form>
    </Modal>
  );
}