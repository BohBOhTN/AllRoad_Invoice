import React, { useState } from 'react';
import { Calendar, Truck, Users, Package, CreditCard, Plus, Trash2 } from 'lucide-react';
import type { Invoice, InvoiceItem, Client, Item, DeliveryRoute, Payment } from '../types';
import InvoicePreview from './InvoicePreview';

// Mock data for demonstration
const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', address: '123 Business St', phone: '555-0123' },
];

const MOCK_ITEMS: Item[] = [
  { id: '1', name: 'Product A', price: 100, description: 'High quality product' },
  { id: '2', name: 'Service B', price: 200, description: 'Professional service' },
];

const MOCK_ROUTES: DeliveryRoute[] = [
  { id: '1', code: 'RT001', name: 'Downtown Route' },
  { id: '2', code: 'RT002', name: 'Suburban Route' },
];

// New: Mock bank accounts
const MOCK_BANK_ACCOUNTS: { id: string; name: string; iban: string; bic: string }[] = [
  { id: 'bank1', name: 'Bank One', iban: 'FR76 1234 5678 9012 3456 7890 123', bic: 'BANKFRPP' },
  { id: 'bank2', name: 'Bank Two', iban: 'FR76 0987 6543 2109 8765 4321 098', bic: 'BKTKFRPP' },
];

function InvoiceForm() {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    date: new Date().toISOString().split('T')[0],
    items: [],
    payments: [],
  });
  const [showPreview, setShowPreview] = useState(false);

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
    const tax = subtotal * 0.2; // 20% VAT
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleGenerateInvoice = () => {
    const { subtotal, tax, total } = calculateTotals();
    // Update bankDetails if there is a bank_transfer payment with a selected bank account
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
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Invoice</h1>
        
        {/* Invoice Header */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            {/* Removed invoice number display */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))}
                className="form-input rounded-md border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Client Selection */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-800">Client Information</h2>
          </div>
          <select
            value={invoice.clientId}
            onChange={(e) => setInvoice(prev => ({ ...prev, clientId: e.target.value }))}
            className="form-select w-full rounded-md border-gray-300"
          >
            <option value="">Select a client</option>
            {MOCK_CLIENTS.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>

        {/* Items Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-800">Items</h2>
            </div>
            <button
              onClick={addInvoiceItem}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Unit Price</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {invoice.items?.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">
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
                              customName: selectedItem?.name // now storing the item name
                            });
                          }
                        }}
                        className="form-select w-full rounded-md border-gray-300"
                      >
                        <option value="">Select an item</option>
                        {MOCK_ITEMS.map(i => (
                          <option key={i.id} value={i.id}>{i.name}</option>
                        ))}
                        <option value="custom">Custom Item (Enter Manually)</option>
                      </select>
                      {item.itemId === 'custom' && (
                        <input
                          type="text"
                          value={item.customName || ''}
                          onChange={(e) => updateInvoiceItem(item.id, { customName: e.target.value })}
                          placeholder="Enter custom item name"
                          className="form-input mt-2 rounded-md border-gray-300"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateInvoiceItem(item.id, { quantity: Number(e.target.value) })}
                        className="form-input w-20 rounded-md border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateInvoiceItem(item.id, { unitPrice: Number(e.target.value) })}
                        className="form-input w-32 rounded-md border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-2">${item.total.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeInvoiceItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (20%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Route */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Truck className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-800">Delivery Route</h2>
          </div>
          <select
            value={invoice.deliveryRouteId}
            onChange={(e) => setInvoice(prev => ({ ...prev, deliveryRouteId: e.target.value }))}
            className="form-select w-full rounded-md border-gray-300"
          >
            <option value="">Select a route</option>
            {MOCK_ROUTES.map(route => (
              <option key={route.id} value={route.id}>{route.code} - {route.name}</option>
            ))}
          </select>
        </div>

        {/* Payment Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-800">Payment Information</h2>
            </div>
            <button
              onClick={addPayment}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Payment Method</span>
            </button>
          </div>

          {invoice.payments?.map((payment, index) => (
            <div key={index} className="mb-4">
              <div className="grid grid-cols-3 gap-4">
                <select
                  value={payment.method}
                  onChange={(e) => {
                    const newPayments = [...(invoice.payments || [])];
                    newPayments[index] = { ...payment, method: e.target.value as Payment['method'] };
                    setInvoice(prev => ({ ...prev, payments: newPayments }));
                  }}
                  className="form-select rounded-md border-gray-300"
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
                  className="form-input rounded-md border-gray-300"
                />
                <input
                  type="date"
                  value={payment.dueDate}
                  onChange={(e) => {
                    const newPayments = [...(invoice.payments || [])];
                    newPayments[index] = { ...payment, dueDate: e.target.value };
                    setInvoice(prev => ({ ...prev, payments: newPayments }));
                  }}
                  className="form-input rounded-md border-gray-300"
                />
              </div>
              {/* Render bank account dropdown if payment method is bank_transfer */}
              {payment.method === 'bank_transfer' && (
                <select
                  value={(payment as any).bankAccountId || ''}
                  onChange={(e) => {
                    const newPayments = [...(invoice.payments || [])];
                    newPayments[index] = { ...payment, bankAccountId: e.target.value };
                    setInvoice(prev => ({ ...prev, payments: newPayments }));
                  }}
                  className="form-select rounded-md border-gray-300 mt-2"
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

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Save Draft
          </button>
          <button 
            onClick={handleGenerateInvoice}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Generate Invoice
          </button>
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