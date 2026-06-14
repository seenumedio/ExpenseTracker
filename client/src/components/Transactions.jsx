import Transaction from './Transaction'
import Spinner from './Spinner'
import Filter from './Filter'
import { useSelector } from 'react-redux'

const Transactions = () => {

    const transactions = useSelector(state => state.transactions.txs)
    const loading = useSelector(state => state.transactions.loading)

    return (
        <>
            <Filter />
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
                                    {transactions.map((transaction) => (
                                        <Transaction
                                            key={transaction.id}
                                            transaction={transaction}
                                        />
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
