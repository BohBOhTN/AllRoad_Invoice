import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockInvoices = [
  {
    id: 1,
    client_id: 1,
    client_name: 'Client A',
    manager_id: 1,
    route_id: 1,
    invoice_number: 'FAC012023001',
    date: '2023-01-01',
    total_ht: 100.00,
    tva: 20.00,
    total_ttc: 120.00,
    status: 'Paid',
    created_at: '2023-01-01T00:00:00Z'
  },
  // Add more mock invoices here
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientNameSearch, setClientNameSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredInvoices = mockInvoices.filter(invoice => {
    return (
      (invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.date.includes(searchTerm)) &&
      (clientNameSearch ? invoice.client_name.toLowerCase().includes(clientNameSearch.toLowerCase()) : true) &&
      (statusFilter ? invoice.status === statusFilter : true) &&
      (dateFilter ? invoice.date === dateFilter : true)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Invoices</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by invoice number or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Search by client name"
          value={clientNameSearch}
          onChange={(e) => setClientNameSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Partially Paid">Partially Paid</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total HT</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">TVA</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total TTC</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInvoices.map(invoice => (
            <tr key={invoice.id}>
              <td className="px-6 py-4 whitespace-nowrap text-center">{invoice.invoice_number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{invoice.client_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{invoice.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{invoice.total_ht}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{invoice.tva}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{invoice.total_ttc}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{invoice.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Link to={`/invoices/${invoice.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                {/* Add more actions like "Paid", "Download" here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
