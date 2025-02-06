import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InvoiceForm from './components/InvoiceForm';
import InvoicesPage from './pages/InvoicesPage';
import ClientsPage from './pages/ClientsPage';
import DeliveryRoutesPage from './pages/DeliveryRoutesPage';
import ItemsPage from './pages/ItemsPage';
import SettingsPage from './pages/SettingsPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import ClientForm from './components/ClientForm';
import DeliveryRouteForm from './components/DeliveryRouteForm';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="invoices/create" element={<InvoiceForm />} />
            <Route path="invoices/:id" element={<InvoiceDetailPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/create" element={<ClientForm />} />
            <Route path="clients/edit/:id" element={<ClientForm />} />
            <Route path="routes" element={<DeliveryRoutesPage />} />
            <Route path="routes/create" element={<DeliveryRouteForm />} />
            <Route path="routes/edit/:id" element={<DeliveryRouteForm />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="items/create" element={<ItemForm />} />
            <Route path="items/edit/:id" element={<ItemForm />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Add more routes here */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;