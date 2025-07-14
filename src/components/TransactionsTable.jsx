import PropTypes from "prop-types";
import { calculateRewardPoints } from "../utils/rewardsCalculator";
import LoadingSpinner from "./LoadingSpinner";

const TransactionsTable = ({ transactions, isLoading }) => {
  // Sort transactions by purchase date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.purchaseDate) - new Date(a.purchaseDate);
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="table-container">
      <h3>Transactions</h3>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer Name</th>
              <th>Purchase Date</th>
              <th>Product Purchased</th>
              <th>Price</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <LoadingSpinner message="Loading transactions..." />
                </td>
              </tr>
            ) : sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              sortedTransactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.customerName}</td>
                  <td>{formatDate(transaction.purchaseDate)}</td>
                  <td>{transaction.productPurchased}</td>
                  <td>{formatPrice(transaction.price)}</td>
                  <td>{calculateRewardPoints(transaction.price)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      purchaseDate: PropTypes.string.isRequired,
      productPurchased: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default TransactionsTable;
