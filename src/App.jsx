import React, { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import MainLayOut from './layouts/MainLayOut';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import TransactionPage, { transactionLoader } from './pages/TransactionPage';
import NotFoundPage from './pages/NotFoundPage';
import AddTransactionPage from './pages/AddTransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  // login or logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  // Show login page for all routes if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // Helper to get transactions from localStorage
  const getTransactions = () => {
    const stored = localStorage.getItem('transactions');
    return stored ? JSON.parse(stored) : [];
  };

  // Add new Transaction 
  const addTransaction = async (newTransaction) => {
  const transactions = getTransactions();
  const transactionWithId = {
    ...newTransaction,
    id: Date.now().toString() + Math.floor(Math.random() * 1000)
  };
  const updated = [...transactions, transactionWithId];
  localStorage.setItem('transactions', JSON.stringify(updated));
};


  // Delete Transaction 
  const deleteTransaction = async (id) => {
    const transactions = getTransactions();
    const updated = transactions.filter(tx => tx.id !== id);
    localStorage.setItem('transactions', JSON.stringify(updated));
    return;
  };

  // Update Transaction 
  const updateTransaction = async (transaction) => {
    const transactions = getTransactions();
    const updated = transactions.map(tx =>
      tx.id === transaction.id ? transaction : tx
    );
    localStorage.setItem('transactions', JSON.stringify(updated));
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayOut onLogout={handleLogout} />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path='/transactions'
          element={<TransactionsPage />}
        />
        <Route
          path='/add-transaction'
          element={<AddTransactionPage addTransactionSubmit={addTransaction} />}
        />
        <Route
          path='/edit-transaction/:id'
          element={<EditTransactionPage updateTransactionSubmit={updateTransaction} />}
          loader={transactionLoader}
        />
        <Route
          path='/transactions/:id'
          element={<TransactionPage deleteTransaction={deleteTransaction} />}
          loader={transactionLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
