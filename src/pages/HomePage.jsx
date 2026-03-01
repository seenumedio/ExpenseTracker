import { useState, useEffect } from 'react'

import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import NewUserPage from './NewUserPage';

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from localStorage instead of API
    const stored = localStorage.getItem('transactions');
    const data = stored ? JSON.parse(stored) : [];
    setTransactions(data);
  }, []);

  if (transactions.length === 0) {
    return <NewUserPage />;
  }
  return (
    <>
      <Hero />
      <div style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
        <HomeCards transactions={transactions} />
      </div>
    </>
  )
}

export default HomePage
