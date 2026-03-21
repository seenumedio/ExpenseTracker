import React, { useState } from 'react';
import { Wallet, PiggyBank, Upload, Receipt, LogOut, ChevronRight, FileUp } from 'lucide-react';

const ExpenseTracker = () => {
  // --- LOGIC & STATE ---
  const [income, setIncome] = useState(2000);
  const [transactions, setTransactions] = useState([
    { id: 1, date: 'April 24, 2024', category: 'Groceries', amount: 50 },
    { id: 2, date: 'April 24, 2024', category: 'Transport', amount: 40 },
    { id: 3, date: 'April 23, 2024', category: 'Entertainment', amount: 21 },
  ]);

  // Derived state calculations
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const savings = income - totalExpenses;

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans pb-10">
      
      {/* HEADER */}
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <header className="bg-[#2D3748] text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-teal-400 p-2 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-wide">Expense Tracker</h1>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">List</a>
            <a href="#" className="hover:text-white transition-colors">Add</a>
          </nav>
          
          <button className="bg-[#FF7675] hover:bg-[#ff6160] transition-colors text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm">
            Log Out
          </button>
        </header>
      </div>

      {/* HERO SECTION */}
      <div className="text-center mt-12 mb-10 px-4">
        <h2 className="text-4xl font-bold text-[#2D3748] mb-3">Track Your Expenses</h2>
        <p className="text-gray-500 text-lg">Simplify your budgeting with our intuitive expense tracker.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Income Card */}
          <div className="bg-[#F0FDF4] rounded-2xl p-6 shadow-sm flex items-center gap-5 border border-green-50">
            <div className="bg-teal-400 p-3 rounded-xl shadow-sm text-white">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Month's Income</p>
              <p className="text-2xl font-bold text-gray-800">₹ {income}</p>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="bg-[#FEF2F2] rounded-2xl p-6 shadow-sm flex items-center gap-5 border border-red-50">
            <div className="bg-[#FF7675] p-3 rounded-xl shadow-sm text-white">
              <Receipt className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-800">₹ {totalExpenses}</p>
            </div>
          </div>

          {/* Savings Card */}
          <div className="bg-[#EFF6FF] rounded-2xl p-6 shadow-sm flex items-center gap-5 border border-blue-50">
            <div className="bg-[#74B9FF] p-3 rounded-xl shadow-sm text-white">
              <PiggyBank className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Savings</p>
              <p className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                ₹ {savings} 
                <span className="text-blue-500 text-sm">↑</span>
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Scan & Add Expense */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[#2D3748] mb-6">Scan & Add Expense</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl bg-[#F8FAFC] p-10 flex flex-col items-center justify-center text-center">
              <FileUp className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-6">
                Drop your receipt here or <span className="text-blue-500 font-medium cursor-pointer">Browse</span>
              </p>
              <button className="bg-[#4A90E2] hover:bg-[#357ABD] transition-colors text-white px-8 py-3 rounded-lg font-medium shadow-sm">
                Upload & Analyze
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#2D3748]">Recent Transactions</h3>
              <button className="text-blue-500 text-sm font-medium flex items-center hover:underline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="flex-grow">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-sm border-b border-gray-100">
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Category</th>
                    <th className="pb-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-4 text-sm">{tx.date}</td>
                      <td className="py-4 text-sm">{tx.category}</td>
                      <td className="py-4 font-medium text-gray-900">₹ {tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="text-blue-500 text-sm font-medium flex items-center hover:underline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;