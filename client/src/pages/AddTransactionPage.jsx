import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategorySelector from '../components/CategorySelector';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useDispatch } from 'react-redux';
import { addTx } from '../features/transactions/txSlice';
import API from '../api/axios';

const AddTransactionPage = () => {
    const [preview, setPreview] = useState(null);// state for image preview
    const [scanning, setScanning] = useState(false);
    // local form states
    const [type, setType] = useState('Expense');
    const [recurring, setRecurring] = useState('Monthly');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(Date.now());
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleReceiptUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // show img preview
        setPreview(URL.createObjectURL(file));
        setScanning(true);
        // Send file to backend as FormData
        const formData = new FormData();
        formData.append('receipt', file);

        try {
            const response = await API.post('/transactions/scan-receipt', formData)
            const res = await response.data;
            if (res.success) {
                // Auto-fill form fields with extracted data
                if (res.data.amount) setAmount(res.data.amount);
                if (res.data.date) setDate(res.data.date);
                if (res.data.merchant) setCategory(res.data.merchant);
                if (res.data.description) setDescription(res.data.description);
            }
        } catch (error) {
            console.error('Receipt scan failed:', error);
        } finally {
            setScanning(false);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const newTransaction = {
            type,
            category,
            recurring,
            date,
            description,
            amount
        };
        if (newTransaction) {
            const res = await API.post('/transactions', newTransaction)
            dispatch(addTx(res.data));
        }
        toast.success('Transaction added successfully');
        return navigate('/transactions');
    };


    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-20">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h2 className="text-3xl text-center font-semibold mb-6">Add Transaction</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceiptUpload}
                        style={{ display: 'none' }}
                        id="receipt-upload"
                        disabled={scanning}
                    />
                    <label htmlFor="receipt-upload" style={{ cursor: 'pointer' }}>
                        <button 
                            type="button" 
                            onClick={() => document.getElementById('receipt-upload').click()}
                            className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
                        >
                            {scanning ? 'Scanning...' : 'Upload Receipt'}
                        </button>
                    </label>
                    {preview && (
                        <img src={preview} alt="Receipt preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                    {!scanning && (<form onSubmit={submitForm}>
                        <div className="my-4">
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
                                onWheel={(e) => e.target.blur()}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Date
                            </label>
                            <DatePicker
                                selected={date ? new Date(date) : null}
                                onChange={(d) => setDate(d.toISOString().split('T')[0])}
                                placeholderText="Select a date"
                                dateFormat="dd/MM/yyyy"
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        <div>
                            <button
                                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Add Transaction
                            </button>
                        </div>
                    </form>)}
                </div>
            </div>
        </section>
    )
}

export default AddTransactionPage