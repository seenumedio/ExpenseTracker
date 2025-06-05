import { useNavigate } from 'react-router-dom';
import { VictoryPie, VictoryLegend, VictoryTooltip } from 'victory';

// Map recurring type to color
const RECURRING_COLORS = {
  Daily: "#ff8042",
  Weekly: "#ffc658",
  Monthly: "#82ca9d"
};

const PieExpenses = ({ expenses }) => {
  const navigate = useNavigate();

  const handleClick = (event, props) => {
    navigate(`./transactions/${props.datum.id}`);
  };

  // Step 1: Filter only Expense entries
  const expenseData = expenses.filter(entry => entry.type === 'Expense');

  // Step 2: Find latest date
  const latestDate = expenseData.reduce((latest, curr) => {
    const currDate = new Date(curr.date).toDateString();
    return (!latest || new Date(currDate) > new Date(latest)) ? currDate : latest;
  }, null);

  // Step 3: Filter expenses for latest date only
  const latestDayExpenses = expenseData.filter(
    entry => new Date(entry.date).toDateString() === latestDate
  );

  // Step 4: Group by category and sum amounts, also collect recurring type for color
  const groupedByCategory = latestDayExpenses.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = {
        category: curr.category,
        amount: 0,
        id: curr.id,
        recurring: curr.recurring // assuming each category has consistent recurring type
      };
    }
    acc[curr.category].amount += curr.amount;
    return acc;
  }, {});

  const finalChartData = Object.values(groupedByCategory);

  // Prepare data for VictoryPie with color based on recurring
  const victoryData = finalChartData.map(item => ({
    x: item.category,
    y: Number(item.amount),
    id: item.id,
    fill: RECURRING_COLORS[item.recurring] || "#8884d8"
  }));

  if (victoryData.length === 0) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center">
        <h2 className="text-xl text-center font-semibold my-4">Last Day's Expenses</h2>
        <div className="text-gray-500 text-lg mt-8">No transactions to display</div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl text-center font-semibold my-4">Last Day's Expenses</h2>
      <div className="w-full h-80 px-4 md:p-0 flex flex-col items-center justify-center mt-44">
        <VictoryPie
          data={victoryData}
          colorScale={victoryData.map(d => d.fill)}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ fill: "white" }}
              style={{ fontSize: 12 }}
            />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: (event, props) => {
                  handleClick(event, props);
                }
              }
            }
          ]}
          innerRadius={40}
          padAngle={2}
          style={{
            data: { cursor: "pointer" },
            labels: { fill: "#333" }
          }}
          width={350}
          height={320}
        />
        <div className='inline px-4 mx-8'>
          <VictoryLegend
            orientation="horizontal"
            gutter={20}
            data={victoryData.map(item => ({
              name: item.x,
              symbol: { fill: item.fill }
            }))}
            style={{
              labels: { fontSize: 20 }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PieExpenses;
