const mongoose = require('mongoose');
const Expense = require('../models/txModel');

exports.getStats = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        // Pipeline 1: Financial Totals
        const totalsPipeline = [
            { $match: { userId } },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] }
                    },
                    totalExpenses: {
                        $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] }
                    }
                }
            }
        ];

        // Pipeline 2: 7-Day Expense Trend (Chronological)

        const weeklyExpensesPipeline = [
            {
                $match: {
                    userId,
                    type: "Expense",
                    date: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    amount: { $sum: "$amount" },
                    rawDate: { $first: "$date" }
                }
            },
            { $sort: { _id: 1 } }
        ];

        const [totalsResult, rawWeeklyExpenses] = await Promise.all([
            Expense.aggregate(totalsPipeline),
            Expense.aggregate(weeklyExpensesPipeline)
        ]);

        // 2. Format the raw dates into 3-letter weekdays in JavaScript
        const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const last7DaysExpenses = rawWeeklyExpenses.map(item => ({
            day: weekdayNames[new Date(item.rawDate).getDay()],
            amount: item.amount
        }));


        const totals = totalsResult[0] || { totalIncome: 0, totalExpenses: 0 };
        const savings = totals.totalIncome - totals.totalExpenses;

        res.status(200).json({
            success: true,
            data: {
                totalIncome: totals.totalIncome,
                totalExpenses: totals.totalExpenses,
                savings,
                last7DaysExpenses,
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, err: err.message })
    }
};
