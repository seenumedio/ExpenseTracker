import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Utility to get last 7 days
const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().slice(0, 10));
    }
    return days;
};

// Color mapping
const RECURRING_COLORS = {
    Daily: "#ff8042",
    Weekly: "#ffc658",
    Monthly: "#82ca9d"
};

const BarTransactions = ({ transactions }) => {
    const navigate = useNavigate();

    // Filter for last 7 days expense 
    const last7Days = getLast7Days();
    const filtered = transactions
        .filter(tx => tx.type === "Expense" && last7Days.includes(tx.date));

    const data = last7Days.flatMap(date =>
        filtered
            .filter(tx => tx.date === date)
            .map(tx => ({
                ...tx,
                displayDate: date.slice(5), // MM-DD
            }))
    );

    // Custom Tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const tx = payload[0].payload;
            return (
                <div className="bg-white border rounded shadow p-2">
                    <p className="font-semibold">{tx.displayDate}</p>
                    <p className="text-purple-600">{tx.category}: ₹{tx.amount}</p>
                </div>
            );
        }
        return null;
    };

    // Max amount
    const maxAmount = Math.max(...data.map(tx => Number(tx.amount) || 0), 0);

    const handleClick = (data) => {
        if (data && data.id) {
            navigate(`./transactions/${data.id}`);
        }
    };

    if (data.length === 0) {
        return (
            <div className="w-full h-80 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4">Last Week's Expenses</h2>
                <div className="text-gray-500 text-lg mt-8">No transactions to display</div>
            </div>
        );
    }

    return (
        <div className="w-full h-80 p-4 pb-10">
            <h2 className="text-xl font-semibold mb-4">Last Week's Expenses</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="displayDate" />
                    <YAxis domain={[0, maxAmount ? Math.ceil(maxAmount / 1000) * 1000 : 1000]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" onClick={handleClick}>
                        {data.map((entry, idx) => (
                            <Cell
                                key={`cell-${idx}`}
                                fill={RECURRING_COLORS[entry.recurring] || "#8884d8"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarTransactions;
