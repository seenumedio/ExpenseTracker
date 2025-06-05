import { useState, useEffect } from 'react'
import Transaction from './Transaction'
import Spinner from './Spinner'
import Filter from './Filter'

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTxs, setFilteredTxs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch transactions from localStorage instead of API
        const fetchTransactions = () => {
            try {
                const stored = localStorage.getItem('transactions');
                const data = stored ? JSON.parse(stored) : [];
                // Sort transactions by date (recents first)
                const sortedData = data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setTransactions(sortedData);
                setFilteredTxs(sortedData);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    return (
        <>
            <Filter transactions={transactions} onFilter={setFilteredTxs} />
            <section className="md:bg-cream rounded-md md:px-4 md:py-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold mb-4 md:mb-6 text-center">
                        Browse Transactions
                    </h2>
                    {loading
                        ? (<Spinner loading={loading} />)
                        : (
                            <>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                                    {filteredTxs.map((transaction) => (
                                        <Transaction key={transaction.id} transaction={transaction} />
                                    ))}
                                </div>
                            </>
                        )}
                </div>
            </section>
        </>
    )
}

export default Transactions
