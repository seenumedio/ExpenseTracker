import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const RecentTxs = () => {
  const transactions = useSelector(state=>state.transactions.txs);
  const recentTransactions = transactions.slice(0, 5);
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-darkBlue">
          Recent Transactions
        </h2>

        <Link
          to="/transactions"
          className="text-xs text-blue-500 hover:text-blue-600 font-medium"
        >
          View All →
        </Link>
      </div>

      {recentTransactions.length === 0 ? (
        <p className="text-sm text-gray-500">No recent transactions.</p>
      ) : (
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-gray-500">
              <th className="text-left py-2 px-2 text-xs font-semibold">
                Date
              </th>
              <th className="text-left py-2 px-2 text-xs font-semibold">
                Category
              </th>
              <th className="text-left py-2 px-2 text-xs font-semibold">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {recentTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition"
                onClick={() => navigate(`/transactions/${tx.id}`)}
              >
                <td className="py-2 px-2 text-xs text-gray-500">
                  {new Date(tx.rawDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>

                <td className="py-2 px-2 text-xs font-medium text-darkBlue">
                  {tx.category}
                </td>

                <td
                  className={`py-2 px-2 text-xs font-semibold ${tx.type === 'Income'
                      ? 'text-green-600'
                      : 'text-red-500'
                    }`}
                >
                  ₹ {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentTxs;
