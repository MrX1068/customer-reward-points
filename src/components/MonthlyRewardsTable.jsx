import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner";

const MonthlyRewardsTable = ({ monthlyRewards, isLoading }) => {
  // Sort by year and month (newest first)
  const sortedRewards = [...monthlyRewards].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return b.month - a.month;
  });

  return (
    <div className="table-container">
      <h3>Monthly Rewards</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <LoadingSpinner message="Loading monthly rewards..." />
                </td>
              </tr>
            ) : sortedRewards.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No monthly rewards data available.
                </td>
              </tr>
            ) : (
              sortedRewards.map((reward, index) => (
                <tr
                  key={`${reward.customerId}-${reward.year}-${reward.month}-${index}`}
                >
                  <td>{reward.customerId}</td>
                  <td>{reward.customerName}</td>
                  <td>{reward.monthName}</td>
                  <td>{reward.year}</td>
                  <td>{reward.rewardPoints}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

MonthlyRewardsTable.propTypes = {
  monthlyRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      month: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
      monthName: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default MonthlyRewardsTable;
