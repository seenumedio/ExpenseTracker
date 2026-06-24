import { useState, useEffect } from 'react';
import API from "../api/axios";

function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/transactions/stats', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.data;
        setStats(data.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (!stats) return <p>No statistics available.</p>;

  return (
    <div className="stats-dashboard">
      <h2>Monthly Summary</h2>
      <p>Total this month: ${stats.monthlyTotal.toFixed(2)}</p>
      <p>Daily average: ${stats.dailyAverage.toFixed(2)}</p>
      <p>
        vs. last month:{' '}
        {stats.percentChangeFromLastMonth > 0 ? '+' : ''}
        {stats.percentChangeFromLastMonth}%
      </p>

      <h3>Category Breakdown</h3>
      {stats.categoryBreakdown.length === 0 ? (
        <p>No expenses this month yet.</p>
      ) : (
        <ul>
          {stats.categoryBreakdown.map((cat) => (
            <li key={`${cat._id.type}-${cat._id.recurring}`}>
                {cat._id.type} ({cat._id.recurring}): ${cat.total.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StatsDashboard;