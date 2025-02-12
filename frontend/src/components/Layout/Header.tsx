import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            ALLROAD Invoice Management
          </h1>
        </div>

        <div className="flex items-center gap-x-4">
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
          >
            <Bell className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-x-4">
            <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}