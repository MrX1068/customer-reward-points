import * as React from "react";
import PropTypes from "prop-types";
import ReusableTable from "./ReusableTable";

const columns = [
  { field: "customerId", headerName: "Customer ID", flex: 1, sortable: true },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  { field: "monthName", headerName: "Month", flex: 1, sortable: true },
  { field: "year", headerName: "Year", flex: 1, sortable: true },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    flex: 1,
    sortable: true,
  },
];

function MonthlyRewardsTable({ monthlyRewards, isLoading }) {
  const rows = React.useMemo(
    () =>
      monthlyRewards.map((r, idx) => ({
        id: `${r.customerId}-${r.year}-${r.month}-${idx}`,
        ...r,
      })),
    [monthlyRewards]
  );

  return (
    <ReusableTable
      title="Monthly Rewards"
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      getRowId={(row) => row.id}
    />
  );
}

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
