import * as React from "react";
import PropTypes from "prop-types";
import { calculateRewardPoints } from "../utils/rewardsCalculator";
import ReusableTable from "./ReusableTable";

const columns = [
  {
    field: "transactionId",
    headerName: "Transaction ID",
    flex: 1,
    sortable: true,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  {
    field: "purchaseDate",
    headerName: "Purchase Date",
    flex: 1,
    sortable: true,
    valueFormatter: (params) =>
      params
        ? new Date(params).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
  },
  {
    field: "productPurchased",
    headerName: "Product Purchased",
    flex: 1,
    sortable: true,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    sortable: true,
    valueFormatter: (params) => {
      const value = Number(params);
      return !isNaN(value) ? `$${value.toFixed(2)}` : "";
    },
  },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    flex: 1,
    sortable: true,
  },
];

function TransactionsTable({ transactions, isLoading }) {
  const rows = React.useMemo(
    () =>
      transactions.map((t, idx) => ({
        id: t.transactionId || idx,
        ...t,
        rewardPoints: calculateRewardPoints(t.price),
      })),
    [transactions]
  );

  return (
    <ReusableTable
      title="Transactions"
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      getRowId={(row) => row.id}
    />
  );
}

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
