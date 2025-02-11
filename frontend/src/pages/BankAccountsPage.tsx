import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, BarChart2, Search } from 'lucide-react';

interface BankAccount {
  id: string;
  nom: string;
  iban: string;
  bic: string;
}

// Sample bank accounts
const initialAccounts: BankAccount[] = [
  { id: 'bank1', nom: 'Bank One', iban: 'FR76 1234 5678 9012 3456 7890 123', bic: 'BANKFRPP' },
  { id: 'bank2', nom: 'Bank Two', iban: 'FR76 0987 6543 2109 8765 4321 098', bic: 'BKTKFRPP' },
];

// Mock invoices linked to bank accounts
const MOCK_INVOICES = [
  { id: 'inv1', number: 'FAC012023RT001', date: '2023-01-15', dueDate: '2023-02-15', client: 'Acme Corp', status: 'paid', bankAccountId: 'bank1' },
  { id: 'inv2', number: 'FAC022023RT002', date: '2023-02-10', dueDate: '2023-03-10', client: 'Beta LLC', status: 'pending', bankAccountId: 'bank1' },
  { id: 'inv3', number: 'FAC032023RT003', date: '2023-03-08', dueDate: '2023-04-08', client: 'Gamma Inc', status: 'paid', bankAccountId: 'bank2' },
];

function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>(initialAccounts);
  const [editing, setEditing] = useState<BankAccount | null>(null);
  const [form, setForm] = useState<BankAccount>({ id: '', nom: '', iban: '', bic: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state for stats modal
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const resetForm = () => {
    setForm({ id: '', nom: '', iban: '', bic: '' });
    setEditing(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setAccounts(prev => prev.map(acc => (acc.id === editing.id ? form : acc)));
    } else {
      const newAccount = { ...form, id: String(Date.now()) };
      setAccounts(prev => [...prev, newAccount]);
    }
    closeModal();
  };

  const handleEdit = (account: BankAccount) => {
    setEditing(account);
    setForm(account);
    openModal();
  };

  const handleDelete = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    if (editing?.id === id) resetForm();
  };

  // Opens the stats modal for a specific bank account
  const openStatsModal = (account: BankAccount) => {
    setSelectedBank(account);
    setSearchQuery('');
    setStatsModalOpen(true);
  };
  const closeStatsModal = () => {
    setSelectedBank(null);
    setStatsModalOpen(false);
  };

  // Filter invoices based on selected bank and search query
  const filteredInvoices = MOCK_INVOICES.filter(inv => 
    inv.bankAccountId === selectedBank?.id &&
    (inv.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
     inv.client.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl">Bank Accounts</h1>
        <button onClick={openModal} className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Accounts Table */}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">IBAN</th>
            <th className="border p-2">BIC</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(acc => (
            <tr key={acc.id}>
              <td className="border p-2">{acc.nom}</td>
              <td className="border p-2">{acc.iban}</td>
              <td className="border p-2">{acc.bic}</td>
              <td className="border p-2">
                <div className="flex space-x-2 justify-center">
                  <button onClick={() => handleEdit(acc)} className="text-blue-600 hover:text-blue-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(acc.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => openStatsModal(acc)} className="text-green-600 hover:text-green-800">
                    <BarChart2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Bank Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editing ? 'Edit Bank Account' : 'Add Bank Account'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Nom:</label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm(prev => ({ ...prev, nom: e.target.value }))}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">IBAN:</label>
                <input
                  type="text"
                  value={form.iban}
                  onChange={(e) => setForm(prev => ({ ...prev, iban: e.target.value }))}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">BIC:</label>
                <input
                  type="text"
                  value={form.bic}
                  onChange={(e) => setForm(prev => ({ ...prev, bic: e.target.value }))}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded hover:bg-gray-100">
                  <X className="w-4 h-4 inline" />
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <Plus className="w-4 h-4 inline mr-1" />
                  {editing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {statsModalOpen && selectedBank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
          <div className="absolute inset-0 bg-black opacity-60" onClick={closeStatsModal}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Invoices for {selectedBank.nom}</h2>
              <button onClick={closeStatsModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Search Input */}
            <div className="mb-4 flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3 text-gray-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
            {/* Invoices Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Invoice #</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Due Date</th>
                    <th className="border p-2">Client</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-gray-50">
                        <td className="border p-2">{inv.number}</td>
                        <td className="border p-2">{inv.date}</td>
                        <td className="border p-2">{inv.dueDate}</td>
                        <td className="border p-2">{inv.client}</td>
                        <td className="border p-2">
                          <span className={`px-2 py-1 rounded ${inv.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                            {inv.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4 text-gray-500">No invoices found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankAccountsPage;
