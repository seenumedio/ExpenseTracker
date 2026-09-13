import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarTransactions = () => {
  // Fetch transactions from Redux store
  const transactions = useSelector((state) => state.transactions.txs);

  // Get the last 7 days
  const getLast7Days = () => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0, 10));
    }

    return days;
  };

  const last7Days = getLast7Days();

  // Filter and aggregate transactions for each day
  const filteredData = last7Days.map((day) => {
    const dayTransactions = transactions.filter(
      (tx) => tx.rawDate?.slice(0, 10) === day
    );

    const totalAmount = dayTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    return {
      day,
      totalAmount,
    };
  });
  if (!filteredData.length) {
    return <p>No expenses to display</p>;
  }

  return (
    <div className="w-full h-80 p-4 pb-10">
      <h2 className="text-xl font-semibold mb-4">
        Last 7 Days Expenses
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalAmount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarTransactions;