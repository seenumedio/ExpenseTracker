import { Link } from 'react-router-dom';
import ViewAllTransactions from '../components/ViewAllTransactions';

const RecentTxs = ({ transactions }) => {

  // Defensive check: only operate if transactions exist
  const recentTransactions = Array.isArray(transactions)
    ? [...transactions]
        .filter(tx => tx.date) // Make sure date exists
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    : [];

  return (
    <div className="overflow-x-auto sm:pt-2">
      <h2 className="text-xl font-semibold mb-2 md:mb-10">Recent Transactions</h2>

      {recentTransactions.length === 0 ? (
        <p className="text-gray-500">No recent transactions.</p>
      ) : (
        <table className="min-w-full rounded-lg shadow-sm">
          <thead>
            <tr className="text-gray-700 text-sm border-b border-gray-200">
              <th className="text-left py-3 md:text-center">Date</th>
              <th className="text-left py-3 md:text-center">Category</th>
              <th className="text-left py-3 md:text-center">Amount</th>
              <th className="text-left py-3 md:text-center"></th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx) => (
              <tr key={tx.id} className="text-sm">
                <td className="py-3">
                  {new Date(tx.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-3">{tx.category}</td>
                <td
                  className={`py-3 font-semibold ${
                    tx.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ₹{tx.amount}
                </td>
                <td className="py-3">
                  <Link
                    to={`/edit-transaction/${tx.id}`}
                    className="text-blue-600 hover:text-green-400"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ViewAllTransactions />
    </div>
  );
};

export default RecentTxs;
