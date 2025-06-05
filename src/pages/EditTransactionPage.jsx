import { useState } from 'react';
import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import CategorySelector from '../components/CategorySelector';
const EditTransactionPage = ({ updateTransactionSubmit }) => {

    const transaction = useLoaderData();
    const [type, setType] = useState(transaction.type);
    const [recurring, setRecurring] = useState(transaction.recurring);
    const [category, setCategory] = useState(transaction.category);
    const [date, setDate] = useState(transaction.date);
    const [description, setDescription] = useState(transaction.description);
    const [amount, setAmount] = useState(transaction.amount);


    const navigate = useNavigate();
    const { id } = useParams();

    const submitForm = (e) => {
        e.preventDefault();

        const updatedTransaction = {
            id,
            type,
            category,
            recurring,
            date,
            description,
            amount
        };
        updateTransactionSubmit(updatedTransaction);
        toast.success('Transaction updated successfully');
        return navigate(`/transactions/${id}`);
    };

    return (

        <section className="bg-indigo-50">
            <button className='inline-block sm:pl-4'>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to={`/transactions/${id}`}
                        className="text-indigo-600 flex items-center hover:text-lg"
                    >
                        <FaArrowLeft className='mr-1.5' /> Back
                    </Link>
                </div>
            </button>

            <div className="container m-auto max-w-2xl py-4 sm:py-16">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Edit Transaction</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2"
                            >Transaction-type</label
                            >
                            <select
                                id="type"
                                name="type"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="recurring" className="block text-gray-700 font-bold mb-2"
                            >Recurring-type</label
                            >
                            <select
                                id="recurring"
                                name="recurring"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={recurring}
                                onChange={(e) => setRecurring(e.target.value)}
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Daily">Daily</option>
                                <option value="None">None</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2"
                            >Transaction Category</label
                            >
                            <CategorySelector selected={category} onChange={setCategory} required={true} />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-gray-700 font-bold mb-2"
                            >Description</label
                            >
                            <textarea
                                id="description"
                                name="description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="eg. Electricity Bill"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="recurring" className="block text-gray-700 font-bold mb-2"
                            >Amount</label
                            >
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                className="border rounded w-full py-2 px-3"
                                placeholder='In Rupees'
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Date
                            </label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='YY-MM-DD'
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                recurring="submit"
                            >
                                Update Transaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditTransactionPage