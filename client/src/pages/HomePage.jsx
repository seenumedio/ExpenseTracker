import { useState, useEffect } from 'react'

import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import Card from '../components/Card'
import PieExpenses from '../components/PieExpenses'
import BarExpenses from '../components/BarExpenses'
import RecentTxs from '../components/RecentTxs'
import NewUserPage from './NewUserPage';


const HomePage = ({transactions}) => {

  function setTransactions(){
    console.log("Set Transactions");
  }

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
      <div className="w-[95%] mx-auto space-y-6">

        <HomeCards transactions={transactions} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card bg="bg-white" p="p-8">
            <RecentTxs transactions={transactions} />
          </Card>

          <Card bg="bg-white" p="p-8">
            <PieExpenses expenses={transactions} />
          </Card>
        </div>
        <Card bg="bg-white" p="p-8">
          <BarExpenses transactions={transactions} />
        </Card>
      </div>
    </>
  )
}

export default HomePage
