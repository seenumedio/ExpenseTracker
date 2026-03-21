import { useState, useEffect, use } from 'react';
import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import CategorySelector from '../components/CategorySelector';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useDispatch } from 'react-redux';
import { updateTx } from '../features/transactions/txSlice';
import API from '../api/axios';

const EditTransactionPage = ({transactions}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { id } = useParams();
    const transaction = transactions.find(s => String(s.id) === String(id));

    // ✅ hooks FIRST
    const [type, setType] = useState('');
    const [recurring, setRecurring] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    
    // ✅ populate AFTER data comes
    useEffect(() => {
        if (transaction) {
            setType(transaction.type);
            setRecurring(transaction.recurring);
            setCategory(transaction.category);
            setDate(transaction.date);
            setDescription(transaction.description);
            setAmount(transaction.amount);
        }
    }, [transaction]);
    
    // ✅ now safe to return
    if (!transaction) return <p>Loading...</p>;
    
    const submitForm = async (e) => {
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

        if(updatedTransaction){
            await API.patch(`/transactions/${id}`, updatedTransaction)
            dispatch(updateTx(updatedTransaction))
        }
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
                            <DatePicker
                                selected={date ? new Date(date) : null}
                                onChange={(d) => setDate(d.toISOString().slice(0, 10))}
                                placeholderText="Select a date"
                                dateFormat="dd/MM/yyyy"
                                className="border rounded w-full py-2 px-3"
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