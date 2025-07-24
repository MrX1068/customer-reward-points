import * as React from "react";
import PropTypes from "prop-types";
import { calculateRewardPoints } from "../utils/rewardsCalculator";
import ReusableTable from "./ReusableTable";
import { formatCurrency, formatDate } from "../utils/formatters";

const columns = [
  {
    field: "transactionId",
    headerName: "Transaction ID",
    flex: 1,
    sortable: true,
  },
   {
    field: "customerId",
    headerName: "Customer ID",
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
    valueFormatter: (params) => formatDate(params),
  },
  {
    field: "productPurchased",
    headerName: "Product",
    flex: 1,
    sortable: true,
  },
  {
    field: "price",
    headerName: "Purchase Amount",
    flex: 1,
    sortable: true,
    valueFormatter: (params) => formatCurrency(params),
  },
  {
    field: "rewardPoints",
    headerName: "Points Earned",
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
      title="Transaction History"
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