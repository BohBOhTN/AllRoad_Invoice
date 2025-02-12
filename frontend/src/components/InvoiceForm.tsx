import React, { useState } from 'react';
import { Calendar, Truck, Users, Package, CreditCard, Plus, Trash2, X } from 'lucide-react';
import type { Invoice, InvoiceItem, Client, Item, DeliveryRoute, Payment } from '../types';
import InvoicePreview from './InvoicePreview';

// Mock data (unchanged)
const MOCK_CLIENTS = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', address: '123 Business St', phone: '555-0123' },
];

const MOCK_ITEMS = [
  { id: '1', name: 'Product A', price: 100, description: 'High quality product' },
  { id: '2', name: 'Service B', price: 200, description: 'Professional service' },
];

const MOCK_ROUTES = [
  { id: '1', code: 'RT001', name: 'Downtown Route' },
  { id: '2', code: 'RT002', name: 'Suburban Route' },
];

const MOCK_BANK_ACCOUNTS = [
  { id: 'bank1', name: 'Bank One', iban: 'FR76 1234 5678 9012 3456 7890 123', bic: 'BANKFRPP' },
  { id: 'bank2', name: 'Bank Two', iban: 'FR76 0987 6543 2109 8765 4321 098', bic: 'BKTKFRPP' },
];

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center space-x-2 mb-4">
    <div className="p-2 bg-gray-50 rounded-lg">
      <Icon className="w-5 h-5 text-gray-600" />
    </div>
    <h2 className="text-lg font-medium text-gray-900">{title}</h2>
  </div>
);

function InvoiceForm() {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    date: new Date().toISOString().split('T')[0],
    items: [],
    payments: [],
  });
  const [showPreview, setShowPreview] = useState(false);

  // All the handler functions remain unchanged
  const generateInvoiceNumber = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `FAC${month}${year}RT${sequence}`;
  };

  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(),
      itemId: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setInvoice(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem],
    }));
  };

  const removeInvoiceItem = (itemId: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId),
    }));
  };

  const updateInvoiceItem = (id: string, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items?.map(item =>
        item.id === id
          ? { ...item, ...updates, total: (updates.quantity || item.quantity) * (updates.unitPrice || item.unitPrice) }
          : item
      ),
    }));
  };

  const addPayment = () => {
    const newPayment: Payment = {
      method: 'bank_transfer',
      amount: 0,
      dueDate: new Date().toISOString().split('T')[0],
    };
    setInvoice(prev => ({
      ...prev,
      payments: [...(prev.payments || []), newPayment],
    }));
  };

  const calculateTotals = () => {
    const subtotal = invoice.items?.reduce((sum, item) => sum + item.total, 0) || 0;
    const tax = subtotal * 0.2;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleGenerateInvoice = () => {
    const { subtotal, tax, total } = calculateTotals();
    const bankPayment = invoice.payments?.find(p => p.method === 'bank_transfer' && (p as any).bankAccountId);
    const bankDetails = bankPayment
      ? MOCK_BANK_ACCOUNTS.find(account => account.id === (bankPayment as any).bankAccountId)
      : undefined;
    setInvoice(prev => ({
      ...prev,
      number: generateInvoiceNumber(),
      subtotal,
      tax,
      total,
      bankDetails,
    }));
    setShowPreview(true);
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <>
      <div className="p-8 max-w-[1400px] mx-auto bg-gray-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Create New Invoice</h1>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Date Selection */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={invoice.date}
                  onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Client Section */}
            <div>
              <SectionHeader icon={Users} title="Client Information" />
              <select
                value={invoice.clientId}
                onChange={(e) => setInvoice(prev => ({ ...prev, clientId: e.target.value }))}
                className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a client</option>
                {MOCK_CLIENTS.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>

            {/* Items Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <SectionHeader icon={Package} title="Items" />
                <button
                  onClick={addInvoiceItem}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-4">Item</th>
                      <th className="pb-4">Quantity</th>
                      <th className="pb-4">Unit Price</th>
                      <th className="pb-4">Total</th>
                      <th className="pb-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoice.items?.map(item => (
                      <tr key={item.id}>
                        <td className="py-3 pr-4">
                          <select
                            value={item.itemId}
                            onChange={(e) => {
                              if (e.target.value === 'custom') {
                                updateInvoiceItem(item.id, { itemId: 'custom', unitPrice: 0, customName: '' });
                              } else {
                                const selectedItem = MOCK_ITEMS.find(i => i.id === e.target.value);
                                updateInvoiceItem(item.id, {
                                  itemId: e.target.value,
                                  unitPrice: selectedItem?.price || 0,
                                  customName: selectedItem?.name
                                });
                              }
                            }}
                            className="w-full p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="">Select an item</option>
                            {MOCK_ITEMS.map(i => (
                              <option key={i.id} value={i.id}>{i.name}</option>
                            ))}
                            <option value="custom">Custom Item</option>
                          </select>
                          {item.itemId === 'custom' && (
                            <input
                              type="text"
                              value={item.customName || ''}
                              onChange={(e) => updateInvoiceItem(item.id, { customName: e.target.value })}
                              placeholder="Enter custom item name"
                              className="mt-2 w-full p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateInvoiceItem(item.id, { quantity: Number(e.target.value) })}
                            className="w-20 p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateInvoiceItem(item.id, { unitPrice: Number(e.target.value) })}
                            className="w-32 p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </td>
                        <td className="py-3 px-4 text-gray-900">${item.total.toFixed(2)}</td>
                        <td className="py-3 pl-4">
                          <button
                            onClick={() => removeInvoiceItem(item.id)}
                            className="p-1 hover:bg-gray-200 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 flex justify-end">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (20%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-gray-900 pt-2 border-t">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Route */}
            <div>
              <SectionHeader icon={Truck} title="Delivery Route" />
              <select
                value={invoice.deliveryRouteId}
                onChange={(e) => setInvoice(prev => ({ ...prev, deliveryRouteId: e.target.value }))}
                className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a route</option>
                {MOCK_ROUTES.map(route => (
                  <option key={route.id} value={route.id}>{route.code} - {route.name}</option>
                ))}
              </select>
            </div>

            {/* Payment Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <SectionHeader icon={CreditCard} title="Payment Information" />
                <button
                  onClick={addPayment}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Payment</span>
                </button>
              </div>

              <div className="space-y-4">
                {invoice.payments?.map((payment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <select
                        value={payment.method}
                        onChange={(e) => {
                          const newPayments = [...(invoice.payments || [])];
                          newPayments[index] = { ...payment, method: e.target.value as Payment['method'] };
                          setInvoice(prev => ({ ...prev, payments: newPayments }));
                        }}
                        className="p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="cash">Cash</option>
                      </select>
                      <input
                        type="number"
                        value={payment.amount}
                        onChange={(e) => {
                          const newPayments = [...(invoice.payments || [])];
                          newPayments[index] = { ...payment, amount: Number(e.target.value) };
                          setInvoice(prev => ({ ...prev, payments: newPayments }));
                        }}
                        placeholder="Amount"
                        className="p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <input
                        type="date"
                        value={payment.dueDate}
                        onChange={(e) => {
                          const newPayments = [...(invoice.payments || [])];
                          newPayments[index] = { ...payment, dueDate: e.target.value };
                          setInvoice(prev => ({ ...prev, payments: newPayments }));
                        }}
                        className="p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    {payment.method === 'bank_transfer' && (
                      <select
                        value={(payment as any).bankAccountId || ''}
                        onChange={(e) => {
                          const newPayments = [...(invoice.payments || [])];
                          newPayments[index] = { ...payment, bankAccountId: e.target.value };
                          setInvoice(prev => ({ ...prev, payments: newPayments }));
                        }}
                        className="mt-2 w-full p-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">Select bank account</option>
                        {MOCK_BANK_ACCOUNTS.map(account => (
                          <option key={account.id} value={account.id}>
                            {account.name} | {account.iban} | {account.bic}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex justify-end space-x-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium">
                Save Draft
              </button>
              <button 
                onClick={handleGenerateInvoice}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      <InvoicePreview
        invoice={invoice}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
}

export default InvoiceForm;