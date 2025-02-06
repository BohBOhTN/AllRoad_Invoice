import React from 'react';
import { useParams } from 'react-router-dom';

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

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const invoice = mockInvoices.find(inv => inv.id === parseInt(id));

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Invoice Details</h1>
      <p>Invoice Number: {invoice.invoice_number}</p>
      <p>Client Name: {invoice.client_name}</p>
      <p>Date: {invoice.date}</p>
      <p>Total HT: {invoice.total_ht}</p>
      <p>TVA: {invoice.tva}</p>
      <p>Total TTC: {invoice.total_ttc}</p>
      <p>Status: {invoice.status}</p>
      {/* Add more details and actions here */}
    </div>
  );
}
