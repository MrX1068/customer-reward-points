import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner";

const TotalRewardsTable = ({ totalRewards, isLoading }) => {
  // Sort by reward points (highest first)
  const sortedRewards = [...totalRewards].sort((a, b) => {
    return b.rewardPoints - a.rewardPoints;
  });

  return (
    <div className="table-container">
      <h3>Total Rewards</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <LoadingSpinner message="Loading total rewards..." />
                </td>
              </tr>
            ) : sortedRewards.length === 0 ? (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  No total rewards data available.
                </td>
              </tr>
            ) : (
              sortedRewards.map((reward) => (
                <tr key={reward.customerId}>
                  <td>{reward.customerName}</td>
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

TotalRewardsTable.propTypes = {
  totalRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default TotalRewardsTable;
