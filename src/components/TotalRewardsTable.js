import * as React from "react";
import PropTypes from "prop-types";
import ReusableTable from "./ReusableTable";
import { formatCurrency } from "../utils/formatters";

// Column definitions for total rewards summary table
const columns = [
  {
    field: "customerName",
    headerName: "Customer Name",
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
    field: "totalAmountSpent", // Total amount customer spent across all transactions
    headerName: "Total Amount Spent",
    flex: 1,
    sortable: true,
    valueFormatter: (params) => formatCurrency(params),
  },
  {
    field: "rewardPoints", // Total reward points earned by customer
    headerName: "Total Reward Points",
    flex: 1,
    sortable: true,
  },
];

function TotalRewardsTable({ totalRewards, isLoading }) {
  // Transform total rewards data into table rows
  const rows = React.useMemo(
    () =>
      totalRewards.map((r, idx) => ({
        id: r.customerId || idx, // Use customerId as unique row ID
        ...r,
      })),
    [totalRewards]
  );

  return (
    <ReusableTable
      title="Customer Total Rewards Summary"
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      getRowId={(row) => row.id}
    />
  );
}

TotalRewardsTable.propTypes = {
  totalRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
      totalAmountSpent: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default TotalRewardsTable;
