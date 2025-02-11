import React, { useState } from 'react';
import { Clock, FileText, MessageSquare, Timer, Plus, Filter, ChevronDown, MoreVertical, Search, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Invoice {
  id: number;
  invoice_number: string;
  client_name: string;
  date: string;
  total_ht: number;
  status: string;
}

const mockInvoices: Invoice[] = [
  { id: 1, invoice_number: '#054', client_name: 'Jane Cooper', date: '23.05.2023', total_ht: 2800, status: 'Paid' },
  { id: 2, invoice_number: '#054', client_name: 'Esther Howard', date: '23.05.2023', total_ht: 2800, status: 'Paid' },
  { id: 3, invoice_number: '#054', client_name: 'Cameron Williamson', date: '23.05.2023', total_ht: 2800, status: 'Draft' },
  { id: 4, invoice_number: '#054', client_name: 'Brooklyn Simmons', date: '23.05.2023', total_ht: 2800, status: 'Paid' },
  { id: 5, invoice_number: '#054', client_name: 'Leslie Alexander', date: '23.05.2023', total_ht: 2800, status: 'Overdue' },
  { id: 6, invoice_number: '#054', client_name: 'Arlene McCoy', date: '23.05.2023', total_ht: 400, status: 'Overdue' },
  { id: 7, invoice_number: '#054', client_name: 'Marvin McKinney', date: '23.05.2023', total_ht: 400, status: 'Overdue' },
  { id: 8, invoice_number: '#054', client_name: 'Kathryn Murphy', date: '23.05.2023', total_ht: 400, status: 'Overdue' },
];

const StatCard = ({ icon: Icon, amount, label, extra }: { icon: any; amount: string; label: string; extra?: React.ReactNode }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-gray-50 rounded-lg">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
    <p className="text-2xl font-semibold">${amount}</p>
    {extra && (
      <div className="absolute right-0 top-0 bottom-0 w-24 flex items-center justify-center bg-gray-50">
        {extra}
      </div>
    )}
  </div>
);

export default function InvoicesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-gray-50 min-h-screen">
      {/* Header & Create Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <Link
          to="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          Create an Invoice
        </Link>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Clock} amount="60,400" label="Overdue amount" />
        <StatCard icon={FileText} amount="60,400" label="Draft total" />
        <StatCard icon={MessageSquare} amount="60,400" label="Unpaid total" />
        <StatCard icon={Timer} amount="08" label="Average paid time" extra={
          <div className="text-center">
            <p className="text-sm text-gray-600">05</p>
            <p className="text-xs text-gray-500">Scheduled for today</p>
          </div>
        } />
      </div>
      
      {/* Main Invoice List & Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Enter invoice number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">All Invoices</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">Unpaid</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md flex items-center gap-1">
                Draft <span className="bg-gray-200 text-gray-700 rounded px-1">3</span>
              </span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg flex items-center gap-2 hover:bg-gray-100">
              Newest First <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">All Customers</label>
                <select className="w-full p-2 rounded-lg border border-gray-200">
                  <option>Select customer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">All Statuses</label>
                <select className="w-full p-2 rounded-lg border border-gray-200">
                  <option>Select status</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date Range</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="From" className="w-full pl-8 p-2 rounded-lg border border-gray-200" />
                  </div>
                  <div className="relative flex-1">
                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="To" className="w-full pl-8 p-2 rounded-lg border border-gray-200" />
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Apply Filters
            </button>
          </div>
        )}

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">Status</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">Date</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">Number</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium text-sm">Customer</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium text-sm">Total</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-50">
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : invoice.status === 'Draft'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">{invoice.date}</td>
                <td className="py-3 px-4 text-gray-600 text-sm">{invoice.invoice_number}</td>
                <td className="py-3 px-4 text-gray-900 font-medium text-sm">{invoice.client_name}</td>
                <td className="py-3 px-4 text-right text-gray-900 text-sm">${invoice.total_ht}</td>
                <td className="py-3 px-4">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
