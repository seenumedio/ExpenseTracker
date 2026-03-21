import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWallet, FaReceipt, FaPiggyBank } from "react-icons/fa";

const HomeCards = ({ transactions }) => {
    const [activeCard, setActiveCard] = useState(null);

    const lastTx =
        transactions.length > 0
            ? transactions.reduce((a, b) =>
                new Date(a.date) > new Date(b.date) ? a : b
            )
            : null;

    const monthStart = lastTx
        ? new Date(
            new Date(lastTx.date).getFullYear(),
            new Date(lastTx.date).getMonth(),
            1
        )
        : null;

    const thisMonthTxs = monthStart
        ? transactions.filter((tx) => new Date(tx.date) >= monthStart)
        : [];

    const totalIncome = thisMonthTxs
        .filter((tx) => tx.type === "Income")
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const totalExpenses = thisMonthTxs
        .filter((tx) => tx.type === "Expense")
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

    const balance = totalIncome - totalExpenses;

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

    const showAlert = totalIncome > 0 && balance < 0.2 * totalIncome;

    const cards = [
        {
            label: "Income",
            amount: totalIncome,
            bg: "bg-green-50",
            iconBg: "bg-emerald-500",
            icon: <FaWallet className="text-white w-6 h-6" />,
            details: [{ label: "Month's Income", value: totalIncome }]
        },
        {
            label: "Expenses",
            amount: totalExpenses,
            bg: "bg-red-50",
            iconBg: "bg-rose-500",
            icon: <FaReceipt className="text-white w-6 h-6" />,
            details: [{ label: "Total Expenses", value: totalExpenses }]
        },
        {
            label: "Savings",
            amount: balance,
            bg: "bg-blue-50",
            iconBg: "bg-blue-500",
            icon: <FaPiggyBank className="text-white w-6 h-6" />,
            details: [
                { label: "Current Savings", value: balance },
                { label: "Total Savings", value: totalSavings },
            ],
        },
    ];

    return (
        <div className="w-full mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold px-4 mt-6 text-gray-700">
                Check Your Status ➘
            </h2>
            {/* Cards */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 p-4 overflow-x-auto">
                {cards.map((card) => (
                    <motion.div
                        key={card.label}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`${card.bg} rounded-2xl shadow-sm p-5 flex flex-col md:flex-row items-center md:items-center 
                        justify-center md:justify-start gap-3 md:gap-4 cursor-pointer`}
                        onClick={() =>
                            setActiveCard({
                                label: card.label,
                                details: card.details,
                            })
                        }
                    >
                        <div className={`${card.iconBg} p-3 rounded-xl text-white`}>
                            {card.icon}
                        </div>

                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-600 font-medium">
                                {card.label}
                            </p>

                            {/* Hide amount on mobile */}
                            <h2 className="hidden md:block text-2xl font-bold text-gray-800">
                                ₹ {card.amount}
                            </h2>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Alert */}
            {showAlert && (
                <p className="mt-6 text-center text-sm text-red-600 font-medium">
                    ⚠ Balance is below 20% of your income!
                </p>
            )}

            {/* Modal */}
            <AnimatePresence>
                {activeCard && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCard(null)}
                        />

                        <motion.div
                            className="fixed z-50 bg-white rounded-2xl shadow-2xl px-10 py-10
              left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <div className="text-center space-y-4">
                                {activeCard.details.map((item, index) => (
                                    <div key={index}>
                                        <p className="text-gray-500 text-lg">
                                            {item.label}
                                        </p>
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            ₹ {item.value}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeCards;