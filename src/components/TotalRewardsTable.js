import * as React from "react";
import PropTypes from "prop-types";
import ReusableTable from "./ReusableTable";

const columns = [
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  {
    field: "rewardPoints",
    headerName: "Total Reward Points",
    flex: 1,
    sortable: true,
  },
];

function TotalRewardsTable({ totalRewards, isLoading }) {
  const rows = React.useMemo(
    () =>
      totalRewards.map((r, idx) => ({
        id: r.customerId || idx,
        ...r,
      })),
    [totalRewards]
  );

  return (
    <ReusableTable
      title="Total Rewards"
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
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default TotalRewardsTable;
