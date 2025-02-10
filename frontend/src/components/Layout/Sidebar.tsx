import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Truck,
  Package,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Create Invoice', href: '/invoices/create', icon: FileText },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Delivery Routes', href: '/routes', icon: Truck },
  { name: 'Items', href: '/items', icon: Package },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      {/* Sidebar header */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <img className="h-12 w-auto" src="/allroad-logo.png" alt="ALLROAD" />
      </div>
      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      {/* Logout button */}
      <div className="shrink-0 px-4 py-4 border-t border-gray-800">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger button for mobile */}
      <div className="p-4 md:hidden">
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-64">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Regular sidebar for desktop */}
      <div className="hidden md:flex">
        {sidebarContent}
      </div>
    </>
  );
}