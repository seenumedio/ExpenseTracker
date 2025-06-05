import Card from './Card.jsx'
import { FaRupeeSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import RecentTxs from './RecentTxs.jsx';
import PieExpenses from './PieExpenses.jsx';
import BarExpenses from './BarExpenses.jsx';

import { useState } from 'react';

const HomeCards = ({ transactions }) => {
    const [showSavings, setShowSavings] = useState(false);


    /*  Find the last transaction date  */
    const lastTx = transactions.length > 0
        ? transactions.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b)
        : null;

    /* Get the first day of the month for the last transaction */
    const monthStart = lastTx
        ? new Date(new Date(lastTx.date).getFullYear(), new Date(lastTx.date).getMonth(), 1)
        : null;

    /* Filter transactions for the current month (from monthStart) */
    const thisMonthTxs = monthStart
        ? transactions.filter(tx => new Date(tx.date) >= monthStart)
        : [];

    /* Calculate totals for current month */
    const totalIncome = thisMonthTxs
        .filter(tx => tx.type === 'Income')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const totalExpenses = thisMonthTxs
        .filter(tx => tx.type === 'Expense')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const balance = totalIncome - totalExpenses;

    /* Calculate cumulative monthly savings */
    // Group transactions by month
    const monthlySavings = {};
    transactions.forEach(tx => {
        const date = new Date(tx.date);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2025-6"
        if (!monthlySavings[key]) monthlySavings[key] = { income: 0, expense: 0 };
        if (tx.type === 'Income') monthlySavings[key].income += Number(tx.amount);
        if (tx.type === 'Expense') monthlySavings[key].expense += Number(tx.amount);
    });
    // Sum up (income - expense) for each month
    const totalSavings = Object.values(monthlySavings)
        .reduce((sum, m) => sum + (m.income - m.expense), 0);

    /* Alert for low balance */
    const showAlert = totalIncome > 0 && balance < 0.2 * totalIncome;

    return (
        <>
            {/* totals */}
            <section className="md:py-4">
                <div className="container-xl lg:container m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg md:text-center">
                        <Card bg={'bg-yellow-100'} p={'p-4 md:p-6'}>
                            <p className="text-lg">Month's Income</p>
                            <h2 className="mt-2 text-2xl font-bold">
                                <FaRupeeSign className="inline mb-1" /> {totalIncome}
                            </h2>
                        </Card>
                        <Card bg={'bg-red-300'} p={'p-4 md:p-6'}>
                            <p className="text-lg">Total Expenses</p>
                            <h2 className="mt-2 text-2xl font-bold">
                                <FaRupeeSign className="inline mb-1" /> {totalExpenses}
                            </h2>
                        </Card>
                        <Card bg={'bg-indigo-100'} p={'p-4 md:p-6'}>
                            <div className="flex flex-col md:items-center relative">
                                <p className="text-lg">Savings</p>
                                <button
                                    className="mt-2 text-2xl font-bold flex items-center gap-2 focus:outline-none"
                                    onClick={() => setShowSavings(s => !s)}
                                >
                                    <FaRupeeSign className="inline mb-1" /> {balance}
                                    <span className="ml-2 text-base">
                                        {showSavings ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </button>

                                {/* Overlay Dropdown */}
                                {showSavings && (
                                    <>
                                        {/* Optional: semi-transparent overlay */}
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-10 z-50"
                                            onClick={() => setShowSavings(false)}
                                        />
                                        {/* Dropdown */}
                                        <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-xl p-4 w-56 text-left">
                                            <div className="mb-2">
                                                <span className="font-semibold">Current Savings:</span>
                                                <span className="float-right text-green-700 font-bold">
                                                    <FaRupeeSign className="inline mb-1" /> {balance}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">Total Savings:</span>
                                                <span className="float-right text-blue-700 font-bold">
                                                    <FaRupeeSign className="inline mb-1" /> {totalSavings}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Alert signal if balance is less than 20% of income */}
                                {showAlert && (
                                    <div className="mt-3 p-2 bg-red-500 text-white rounded font-semibold">
                                        ⚠️ Alert
                                        <span className='inline md:hidden'>
                                            : Balance is below 20% of your income!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="md:py-4">
                <div className="container-xl lg:container m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg md:text-center">
                        <Card>
                            <PieExpenses expenses={transactions} />
                        </Card>
                        <Card p={'p-4 md:p-6'} order={'order-first md:order-last'}>
                            <RecentTxs transactions={transactions} />
                        </Card>
                    </div>
                </div>
            </section>

            {/* BarGraph */}
            <section className="mx-4 mb-4 md:mb-8">
                <div className="container-xl lg:container m-auto">
                    <Card p={'md:p-6'}>
                        <BarExpenses transactions={transactions} />
                    </Card>
                </div>
            </section>
        </>
    );
};

export default HomeCards;
