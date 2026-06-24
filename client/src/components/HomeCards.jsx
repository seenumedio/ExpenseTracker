import { FaWallet, FaReceipt, FaPiggyBank } from "react-icons/fa";

const HomeCards = ({ stats, loading }) => {
    if (loading) return <p>Loading stats...</p>;
    if (!stats) return <p>No statistics available.</p>;

    const {
        totalIncome,
        totalExpenses,
        savings
    } = stats;

    const cards = [
        {
            label: "Income",
            amount: totalIncome,
            bg: "bg-green-50",
            iconBg: "bg-emerald-500",
            icon: <FaWallet className="text-white w-4 h-4" />,
        },
        {
            label: "Expenses",
            amount: totalExpenses,
            bg: "bg-red-50",
            iconBg: "bg-rose-500",
            icon: <FaReceipt className="text-white w-4 h-4" />,
        },
        {
            label: "Savings",
            amount: savings,
            bg: "bg-blue-50",
            iconBg: "bg-blue-500",
            icon: <FaPiggyBank className="text-white w-4 h-4" />,
        },
    ];

    return (
        <div className="w-full mx-auto px-4">
            <h2 className="text-sm font-semibold px-2 mt-4 text-gray-500 uppercase tracking-wider">
                Overview
            </h2>

            <div className="grid grid-cols-3 gap-3 md:gap-4 p-2 mt-2">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className={`${card.bg} rounded-xl shadow-sm p-3 md:p-4 flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-3`}
                    >
                        <div className={`${card.iconBg} p-2 rounded-lg`}>
                            {card.icon}
                        </div>

                        <div className="text-center md:text-left">
                            <p className="text-xs text-gray-500 font-medium">
                                {card.label}
                            </p>

                            <h2 className="text-sm md:text-lg font-bold text-gray-800">
                                ₹ {card.amount?.toLocaleString()}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeCards;