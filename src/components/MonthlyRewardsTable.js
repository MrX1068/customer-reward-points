import * as React from "react";
import PropTypes from "prop-types";
import ReusableTable from "./ReusableTable";
import { formatCurrency } from "../utils/formatters";

const columns = [
  { field: "customerId", headerName: "Customer ID", flex: 1, sortable: true },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  {
    field: "transactionMonths",
    headerName: "Transaction Months",
    flex: 2,
    sortable: false,
    renderCell: (params) => (
      <div className="multi-line-cell">
        {params.value.split("\n").map((month, index) => (
          <div key={index} className="multi-line-cell-item">
            {month}
          </div>
        ))}
      </div>
    ),
  },
  {
    field: "totalAmountsSpent",
    headerName: "Total Amounts Spent",
    flex: 2,
    sortable: false,
    renderCell: (params) => (
      <div className="multi-line-cell">
        {params.value.split("\n").map((amount, index) => (
          <div key={index} className="multi-line-cell-item">
            {amount}
          </div>
        ))}
      </div>
    ),
  },
  {
    field: "totalRewardPoints",
    headerName: "Total Reward Points",
    flex: 2,
    sortable: false,
    renderCell: (params) => (
      <div className="multi-line-cell">
        {params.value.split("\n").map((points, index) => (
          <div key={index} className="multi-line-cell-item">
            {points}
          </div>
        ))}
      </div>
    ),
  },
];

function MonthlyRewardsTable({ monthlyRewards, isLoading }) {
  const rows = React.useMemo(() => {
    const customerGroups = {};
    monthlyRewards.forEach((reward) => {
      if (!customerGroups[reward.customerId]) {
        customerGroups[reward.customerId] = {
          customerId: reward.customerId,
          customerName: reward.customerName,
          monthlyData: [],
        };
      }
      customerGroups[reward.customerId].monthlyData.push(reward);
    });

    return Object.values(customerGroups).map((customer, idx) => {
      const sortedMonths = customer.monthlyData.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      });

      const transactionMonths = sortedMonths
        .map((m) => `${m.monthName} ${m.year}`)
        .join("\n");
      const totalAmountsSpent = sortedMonths
        .map((m) => formatCurrency(m.totalAmountSpent || 0))
        .join("\n");
      const totalRewardPoints = sortedMonths
        .map((m) => m.rewardPoints)
        .join("\n");

      return {
        id: customer.customerId || idx,
        customerId: customer.customerId,
        customerName: customer.customerName,
        transactionMonths,
        totalAmountsSpent,
        totalRewardPoints,
      };
    });
  }, [monthlyRewards]);

  return (
    <ReusableTable
      title="Customer Monthly Rewards Summary"
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      getRowId={(row) => row.id}
      getRowHeight={(params) => {
        // Calculate dynamic row height based on number of months
        const monthCount = params.model.transactionMonths.split("\n").length;
        return Math.max(60, monthCount * 35 + 20); // Minimum 60px, then 35px per month + padding
      }}
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
