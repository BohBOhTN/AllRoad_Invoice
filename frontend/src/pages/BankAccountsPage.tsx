import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, BarChart2, Search, ArrowUpRight, ArrowDownRight, DollarSign, ChevronLeft, ChevronRight, Info, Receipt, Building, CreditCard } from 'lucide-react';

interface BankAccount {
  id: string;
  nom: string;
  iban: string;
  bic: string;
  balance: number;
}

interface Transaction {
  id: string;
  bankAccountId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'paid' | 'unpaid';
  icon?: string;
  merchant?: string;
}

// Sample bank accounts with balance
const initialAccounts: BankAccount[] = [
  { 
    id: 'bank1', 
    nom: 'Personal Account', 
    iban: 'FR76 1234 5678 9012 3456 7890 123', 
    bic: 'BANKFRPP', 
    balance: 6293.81
  },
  { 
    id: 'bank2', 
    nom: 'Savings Account', 
    iban: 'FR76 0987 6543 2109 8765 4321 098', 
    bic: 'BKTKFRPP', 
    balance: 15750.75
  },
  { 
    id: 'bank3', 
    nom: 'Business Account', 
    iban: 'FR76 5555 6666 7777 8888 9999 000', 
    bic: 'BUSFRPP', 
    balance: 42680.30
  }
];

// Updated mock transactions for a transport company scenario
const MOCK_TRANSACTIONS: Transaction[] = [
  { 
    id: 't1', 
    bankAccountId: 'bank1', 
    type: 'debit', 
    amount: 800.00, 
    description: 'Fuel Expense', 
    date: '2024-03-15 09:52 AM',
    merchant: 'Fuel Station',
    status: 'unpaid',
    icon: 'https://via.placeholder.com/32'
  },
  { 
    id: 't2', 
    bankAccountId: 'bank2', 
    type: 'debit', 
    amount: 1500.00, 
    description: 'Truck Rent', 
    date: '2024-03-14 06:07 PM',
    merchant: 'Truck Rental Co',
    status: 'paid'
  },
  { 
    id: 't3', 
    bankAccountId: 'bank3', 
    type: 'credit', 
    amount: 12000.00, 
    description: 'Transport Company Payment', 
    date: '2024-03-13 11:28 PM',
    merchant: 'Big Transport Corp',
    status: 'paid'
  },
  { 
    id: 't4', 
    bankAccountId: 'bank1', 
    type: 'debit', 
    amount: 2200.68, 
    description: 'Driver Salary', 
    date: '2024-03-12 02:16 PM',
    merchant: 'Salary Dept',
    status: 'unpaid',
    icon: 'https://via.placeholder.com/32'
  },
  { 
    id: 't5', 
    bankAccountId: 'bank2', 
    type: 'debit', 
    amount: 500.00, 
    description: 'Maintenance Expense', 
    date: '2024-03-11 10:00 AM',
    merchant: 'Maintenance Inc',
    status: 'paid'
  }
];

function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>(initialAccounts);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number>(0);
  const [isAddAccountModal, setIsAddAccountModal] = useState(false);
  const [isDepositModal, setIsDepositModal] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState<Omit<BankAccount, 'id'>>({
    nom: '',
    iban: '',
    bic: '',
    balance: 0
  });
  const [depositForm, setDepositForm] = useState({
    amount: '',
    description: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(amount);
  };

  const handlePrevAccount = () => {
    setSelectedAccountIndex(prev => 
      prev === 0 ? accounts.length - 1 : prev - 1
    );
  };

  const handleNextAccount = () => {
    setSelectedAccountIndex(prev => 
      prev === accounts.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const newAccount = {
      ...newAccountForm,
      id: `bank${Date.now()}`
    };
    setAccounts([...accounts, newAccount]);
    setIsAddAccountModal(false);
    setNewAccountForm({ nom: '', iban: '', bic: '', balance: 0 });
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositForm.amount);
    if (isNaN(amount)) return;

    const updatedAccounts = accounts.map((account, index) => {
      if (index === selectedAccountIndex) {
        return {
          ...account,
          balance: account.balance + amount
        };
      }
      return account;
    });

    setAccounts(updatedAccounts);
    setIsDepositModal(false);
    setDepositForm({ amount: '', description: '' });
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
    if (selectedAccountIndex >= accounts.length - 1) {
      setSelectedAccountIndex(accounts.length - 2);
    }
  };

  // Dummy handlers for the new actions
  const handleUpdateStatus = (transactionId: string) => {
    // ...implement status update logic...
    console.log(`Status updated for transaction ${transactionId}`);
  };

  const handleViewDetails = (transactionId: string) => {
    // ...implement view details logic...
    console.log(`Viewing details for transaction ${transactionId}`);
  };

  const selectedAccount = accounts[selectedAccountIndex];

  // Filter transactions for the selected bank account and sort by date descending
  const accountTransactions = MOCK_TRANSACTIONS
    .filter(t => t.bankAccountId === selectedAccount.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Bank Account and Actions */}
          <div className="space-y-6">
            {/* Bank Account Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  My Bank Accounts <span className="text-sm text-gray-400 ml-1">({accounts.length})</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsAddAccountModal(true)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={handlePrevAccount}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button 
                    onClick={handleNextAccount}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Account Display */}
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
                  <div className="flex justify-between items-start mb-8">
                    <Building className="w-12 h-12" />
                    <button 
                      onClick={() => handleDeleteAccount(selectedAccount.id)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">{selectedAccount.nom}</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-white/60">IBAN</p>
                      <p className="font-medium tracking-wider">{selectedAccount.iban}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-white/60">BIC</p>
                        <p className="font-medium">{selectedAccount.bic}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Balance</p>
                        <p className="font-medium">{formatCurrency(selectedAccount.balance)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setIsDepositModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Money</span>
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - All Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Show All
              </button>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
              {accountTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      {transaction.icon ? (
                        <img src={transaction.icon} alt={transaction.merchant} className="w-6 h-6" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                          {transaction.merchant?.[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.merchant}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                      <p className="text-sm text-gray-600">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{transaction.status.toUpperCase()}</span>
                      <button 
                        onClick={() => handleUpdateStatus(transaction.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Edit2 className="w-4 h-4 text-gray-400" />
                      </button>
                      <button 
                        onClick={() => handleViewDetails(transaction.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Info className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      {isAddAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsAddAccountModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Bank Account</h2>
              <button onClick={() => setIsAddAccountModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block mb-1">Account Name:</label>
                <input
                  type="text"
                  value={newAccountForm.nom}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, nom: e.target.value }))}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">IBAN:</label>
                <input
                  type="text"
                  value={newAccountForm.iban}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, iban: e.target.value }))}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">BIC:</label>
                <input
                  type="text"
                  value={newAccountForm.bic}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, bic: e.target.value }))}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Initial Balance:</label>
                <input
                  type="number"
                  step="0.01"
                  value={newAccountForm.balance}
                  onChange={(e) => setNewAccountForm(prev => ({ ...prev, balance: parseFloat(e.target.value) }))}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddAccountModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {isDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsDepositModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Money to Account</h2>
              <button onClick={() => setIsDepositModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block mb-1">Amount:</label>
                <input
                  type="number"
                  step="0.01"
                  value={depositForm.amount}
                  onChange={(e) => setDepositForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Description:</label>
                <input
                  type="text"
                  value={depositForm.description}
                  onChange={(e) => setDepositForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full border rounded-xl p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsDepositModal(false)}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Add Money
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankAccountsPage;
