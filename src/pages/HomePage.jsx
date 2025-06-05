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
            <HomeCards transactions={transactions} />
        </>
    )
}

export default HomePage
