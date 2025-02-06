export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface DeliveryRoute {
  id: string;
  code: string;
  name: string;
}

export interface InvoiceItem {
  id: string;
  itemId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  method: 'bank_transfer' | 'credit_card' | 'cash';
  amount: number;
  dueDate: string;
}

export interface Invoice {
  number: string;
  date: string;
  clientId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  deliveryRouteId: string;
  payments: Payment[];
}