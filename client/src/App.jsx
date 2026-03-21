import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import MainLayOut from './layouts/MainLayOut';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import TransactionPage from './pages/TransactionPage';
import NotFoundPage from './pages/NotFoundPage';
import AddTransactionPage from './pages/AddTransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';
import LoginPage from './pages/LoginPage';

import { useSelector, useDispatch } from 'react-redux'
import API from './api/axios.js'
import { setTxs, setLoading } from './features/transactions/txSlice.js'

const App = () => {
  // login or logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const transactions = useSelector(state => state.transactions.txs)
  const dispatch = useDispatch()
  // fetch txs
  useEffect(() => {
    const fetchTxs = async () => {
        try {
            dispatch(setLoading(true))
            const res = await API.get('/transactions')
            dispatch(setTxs(res.data))
        } catch (err) {
            console.log('Error:', err)
        } finally {
            dispatch(setLoading(false))
        }
    }
    fetchTxs()
  }, [dispatch])

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
  // const router = createBrowserRouter(
  //   createRoutesFromElements(

  //   )
  // );

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayOut onLogout={handleLogout} />}>
          <Route
            index
            element={<HomePage transactions={transactions} />}
          />
          <Route
            path='/transactions'
            element={<TransactionsPage />}
          />
          <Route
            path='/add-transaction'
            element={<AddTransactionPage />}
          />
          <Route
            path='/edit-transaction/:id'
            element={<EditTransactionPage transactions={transactions}/>}
          />
          <Route
            path='/transactions/:id'
            element={<TransactionPage />}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
