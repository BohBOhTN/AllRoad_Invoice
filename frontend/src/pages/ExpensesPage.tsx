import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { Euro, Eye, Edit } from 'lucide-react';
import { ExpenseForm } from '../components/ExpenseForm';
import { CategoryForm } from '../components/CategoryForm';

// ...dummy data and helper logic...
const dummyExpenses = [
  { id: 1, amount: 100, category: 'fuel', bankAccount: 'Bank A', description: 'Fuel for truck', date: new Date().toISOString() },
  { id: 2, amount: 50, category: 'tickets', bankAccount: 'Bank B', description: 'Toll ticket', date: new Date().toISOString() },
  // ...more dummy data...
];

// Extract today's expenses and top category calculations:
function getTodayAndTop(expenses: Array<{ amount: number; category: string; date: string }>) {
  const todayExpenses = expenses.reduce((sum, expense) => {
    if (new Date(expense.date).toDateString() === new Date().toDateString()) {
      return sum + expense.amount;
    }
    return sum;
  }, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategoryEntry = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];
  return { todayExpenses, topCategory: topCategoryEntry };
}

// Prepare chart data:
function getChartData(expenses: Array<{ amount: number; category: string; date: string }>) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(categoryTotals).map(([cat, total]) => ({ category: cat, total }));
}

export default function ExpensesPage() {
  const [search, setSearch] = useState('');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const filteredExpenses = dummyExpenses.filter(exp =>
    exp.description.toLowerCase().includes(search.toLowerCase()) ||
    exp.category.toLowerCase().includes(search.toLowerCase())
  );

  const { todayExpenses, topCategory } = getTodayAndTop(dummyExpenses);
  const chartData = getChartData(dummyExpenses);

  return (
    <div className="p-4 space-y-8">
      {/* Top cards: Today's Expenses & Top Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Today's Expenses</h3>
            <Euro className="w-6 h-6 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-semibold">€{todayExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Top Category</h3>
            <Euro className="w-6 h-6 text-blue-500" />
          </div>
          {topCategory && (
            <>
              <p className="mt-2 text-xl font-semibold">{topCategory[0]}</p>
              <p className="text-gray-600">€{topCategory[1].toFixed(2)}</p>
            </>
          )}
        </div>
      </div>

      {/* Expenses Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <input 
            type="text" 
            placeholder="Search expenses..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-x-2">
            <button 
              onClick={() => setShowExpenseForm(true)} 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
            >
              Add Expense
            </button>
            <button 
              onClick={() => setShowCategoryForm(true)} 
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow hover:bg-green-700"
            >
              Add Category
            </button>
          </div>
        </div>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-200 rounded-t-lg">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Bank Account</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 shadow rounded-b-lg">
            {filteredExpenses.map(exp => (
              <tr key={exp.id} className="hover:bg-gray-50 transition">
                <td className="p-3">{exp.id}</td>
                <td className="p-3">€{exp.amount}</td>
                <td className="p-3">{exp.category}</td>
                <td className="p-3">{exp.bankAccount}</td>
                <td className="p-3">{exp.description}</td>
                <td className="p-3 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700" title="View">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-700" title="Edit">
                    <Edit className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expense Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense and Category modals */}
      <ExpenseForm 
        isOpen={showExpenseForm} 
        onClose={() => setShowExpenseForm(false)} 
        categories={['fuel', 'tickets', 'péage', 'location']}
      />
      <CategoryForm 
        isOpen={showCategoryForm} 
        onClose={() => setShowCategoryForm(false)} 
      />
    </div>
  );
}
