import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaRupeeSign, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TransactionPage = ({ deleteTransaction }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Load the transaction from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transaction = transactions.find(tx => String(tx.id) === String(id));

    const deleteOnClick = (transactionId) => {
        const confirm = window.confirm('Are u sure want to del?');
        if (!confirm) return;

        deleteTransaction(transactionId);

        toast.success('Transaction deleted successfully');
        navigate('/transactions');
    };

    if (!transaction) {
        return (
            <div className="text-center text-xl text-red-600 mt-16">
                Transaction not found.
            </div>
        );
    }

    return (
        <>
            <section className='inline-block pl-4'>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/transactions"
                        className="text-red-600 hover:text-indigo-600 flex items-center hover:text-lg"
                    >
                        <FaArrowLeft className='mr-1.5' /> Back
                    </Link>
                </div>
            </section>

            <section className="bg-cream">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full md:gap-6">
                        <main className='md:col-span-2 space-y-4'>
                            <div
                                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                            >
                                <div className='mb-12 md:mb-0'>
                                    <span
                                        className={
                                            `${transaction.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} 
                                        text-lg px-2 py-1 float-left md:float-none rounded-md `
                                        }
                                    >{transaction.type}</span>
                                    <div className='md:mt-4'>
                                        <span
                                            className="text-sm text-gray-600 bg-gray-200 
                                            px-2 py-1 rounded-full float-right md:float-none">
                                            {transaction.recurring}
                                        </span>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold mt-1 mb-4">
                                    {transaction.category}
                                </h1>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-extrabold mb-6">
                                    Transaction Description
                                </h3>

                                <p className="mb-4">
                                    {transaction.description}
                                </p>

                            </div>
                        </main>

                        <aside className="space-y-4 self-start">
                            <div className="bg-white p-6 rounded-lg shadow-md z-2">
                                <div className='mb-4'>
                                    <FaCalendarAlt
                                        className="inline fa-solid fa-location-dot text-lg text-orange-700 mr-2 mb-1"
                                    />
                                    <p className="inline text-orange-700">{transaction.date}</p>

                                </div>
                                <div>
                                    <h3 className="text-indigo-800 text-lg font-bold mb-2">
                                        <FaRupeeSign
                                            className="inline text-orange-700 mb-1"
                                        />
                                        {transaction.amount}</h3>

                                    <p className="mb-4">{transaction.amount + ' Rupees only'}</p>

                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Manage Transaction</h3>
                                <Link
                                    to={`/edit-transaction/${id}`}
                                    className="bg-green-500 hover:bg-green-400 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >Edit Transaction</Link>
                                <button onClick={() => deleteOnClick(transaction.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-6 block"
                                >
                                    Delete Transaction
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
};

// Loader for React Router (now using localStorage)
const transactionLoader = async ({ params }) => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transaction = transactions.find(tx => String(tx.id) === String(params.id));
    return transaction || null;
};

export { TransactionPage as default, transactionLoader }
