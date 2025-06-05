import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategorySelector from '../components/CategorySelector';
const AddTransactionPage = ({ addTransactionSubmit }) => {
    const [type, setType] = useState('Income');
    const [recurring, setRecurring] = useState('Monthly');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        const newTransaction = {
            type,
            category,
            recurring,
            date,
            description,
            amount
        };
        addTransactionSubmit(newTransaction);
        toast.success('Transaction added successfully');
        return navigate('/transactions');
    };

    const handleCategoryChange = (category) => {
        setForm({ ...form, category });
    };
    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-20">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Add Transaction</h2>

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
                            <label className="block text-gray-700 font-bold mb-2"
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
                            <CategorySelector
                                selected={category}
                                onChange={(val) => setCategory(val)}
                                required={true}
                            />
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
                            <label className="block text-gray-700 font-bold mb-2"
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
                                Add Transaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddTransactionPage