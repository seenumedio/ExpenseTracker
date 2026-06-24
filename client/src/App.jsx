import { useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import MainLayOut from './layouts/MainLayOut';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import TransactionPage from './pages/TransactionPage';
import NotFoundPage from './pages/NotFoundPage';
import AddTransactionPage from './pages/AddTransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';

import AuthPage from './pages/AuthPage.jsx';

import { useSelector, useDispatch } from 'react-redux'
import API from './api/axios.js'
import { setTxs, setLoading } from './features/transactions/txSlice.js'
import { logout } from './features/auth/authSlice.js'

const App = () => {
  // login or logout
  const { token } = useSelector(state => state.auth)
  const transactions = useSelector(state => state.transactions.txs)
  const filters = useSelector(state => state.transactions.filters)
  const dispatch = useDispatch()

  // fetch txs
  useEffect(() => {
    const fetchTxs = async () => {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.type && filters.type !== 'all') params.append('type', filters.type);
      if (filters.recurring && filters.recurring !== 'all') params.append('recurring', filters.recurring);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      try {
        dispatch(setLoading(true))
        const res = await API.get(`/transactions?${params.toString()}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        dispatch(setTxs(res.data))
      } catch (err) {
        if (err.response?.status === 401) dispatch(logout());
        console.log('Error:', err)
      } finally {
        dispatch(setLoading(false))
      }
    }
    if (token) fetchTxs()
  }, [filters, dispatch, token])

  // no token=> show auth forms
  if (!token) return <AuthPage />

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayOut />}>
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
            element={<EditTransactionPage transactions={transactions} />}
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
