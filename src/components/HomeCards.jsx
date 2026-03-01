import Card from './Card.jsx'
import { FaWallet } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import RecentTxs from './RecentTxs.jsx';
import PieExpenses from './PieExpenses.jsx';
import BarExpenses from './BarExpenses.jsx';
import NewCard from './NewCard.jsx';

import { useState } from 'react';

const HomeCards = ({ transactions }) => {
    const [activeCard, setActiveCard] = useState(null);


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
                    <h2 className="text-xl md:text-2xl font-semibold px-4 mt-6 text-gray-700">
                        Check Your Status ➘
                    </h2>

                    <div className="grid grid-cols-3 gap-6 p-4">
                        <NewCard
                            bg="emerald"
                            setActiveCard={setActiveCard}
                            type="Income"
                            amount={totalIncome}
                        />

                        <NewCard
                            bg="rose"
                            setActiveCard={setActiveCard}
                            type="Expenses"
                            amount={totalExpenses}
                        />

                        <NewCard
                            bg="sky"
                            setActiveCard={setActiveCard}
                            type="Savings"
                            extra={{ totalSavings }}
                            amount={balance}
                        />
                    </div>
                    {showAlert && (
                        <p className="mt-4 text-center text-sm text-red-600 font-medium">
                            ⚠ Balance is below 20% of your income!
                        </p>
                    )}
                </div>
            </section>
            <AnimatePresence>
                {activeCard && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCard(null)}
                        />

                        {/* Floating Modal */}
                        <motion.div
                            className="fixed z-50 bg-white rounded-2xl shadow-2xl px-10 py-12
                   left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0.7, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <div className="text-center">
                                <p className="text-gray-500 text-lg mb-2">
                                    Month's {activeCard.label}
                                </p>
                                <h2 className="text-3xl font-extrabold text-gray-900">
                                    ₹ {activeCard.amount}
                                </h2>
                                {activeCard.extra && (
                                    <>
                                        <p className="text-gray-500 text-lg my-2">Total Savings</p>
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            ₹ {activeCard.extra.totalSavings}
                                        </h2>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default HomeCards;
