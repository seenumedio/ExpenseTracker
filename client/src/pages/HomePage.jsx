import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import Card from '../components/Card'
import PieExpenses from '../components/PieExpenses'
import BarExpenses from '../components/BarExpenses'
import RecentTxs from '../components/RecentTxs'
import ImgUpload from '../components/ImgUpload'
import NewUserPage from './NewUserPage';
import API from "../api/axios";


const HomePage = ({ transactions }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const txsLoading = useSelector(state => state.transactions.loading)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/transactions/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.data;
        setStats(data.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  if (txsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return <NewUserPage />;
  }
  return (
    <>
      <Hero />
      <div className="w-[95%] mx-auto space-y-6">

        <HomeCards 
          stats={stats || { totalIncome: 0, totalExpenses: 0, balance: 0 }} 
          loading={loading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card bg="bg-white" p="p-6">
            <ImgUpload />
          </Card>
          <Card bg="bg-white" p="p-6">
            <RecentTxs transactions={transactions} />
          </Card>
        </div>
        {/* <Card bg="bg-white" p="p-8">
          <PieExpenses expenses={transactions} />
        </Card> */}
        {/* <Card bg="bg-white" p="p-8">
          <BarExpenses 
            data={stats?.last7DaysExpenses}
            loading={loading}
          />
        </Card> */}
      </div>
    </>
  )
}

export default HomePage
