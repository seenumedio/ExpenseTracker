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

const BarTransactions = ({ data }) => {
    if (!data?.length) {
      return <p>No expenses to display</p>;
    }
  
    return (
      <div className="w-full h-80 p-4 pb-10">
        <h2 className="text-xl font-semibold mb-4">
          Last 7 Days Expenses
        </h2>
  
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

export default BarTransactions;
