import React from 'react';
import { FileText, Users, Truck, Package } from 'lucide-react';

const stats = [
  { name: 'Total Invoices', value: '0', icon: FileText },
  { name: 'Active Clients', value: '0', icon: Users },
  { name: 'Delivery Routes', value: '0', icon: Truck },
  { name: 'Items', value: '0', icon: Package },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
}