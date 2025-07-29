import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";
import ReusableTable from "./ReusableTable";
import { calculateRewardPoints } from "../utils/rewardsCalculator";
import { formatCurrency, formatDate } from "../utils/formatters";
import dayjs from "dayjs";

const columns = [
  { field: "customerId", headerName: "Customer ID", flex: 1, sortable: true },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  {
    field: "transactionId",
    headerName: "Transaction ID",
    flex: 1,
    sortable: true,
  },
  {
    field: "amountSpent",
    headerName: "Amount Spent",
    flex: 1,
    sortable: true,
    valueFormatter: (params) => formatCurrency(params),
  },
  {
    field: "transactionDate",
    headerName: "Transaction Date",
    flex: 1,
    sortable: true,
    valueFormatter: (params) => formatDate(params),
  },
  {
    field: "transactionYear",
    headerName: "Transaction Year",
    flex: 1,
    sortable: true,
  },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    flex: 1,
    sortable: true,
  },
];

const MonthlyRewardsByMonth = ({
  monthlyRewards,
  isLoading,
  dateRange,
  allTransactions,
}) => {
  const groupedByMonth = React.useMemo(() => {
    const groups = {};

    monthlyRewards.forEach((reward) => {
      const key = `${reward.year}-${reward.month}`;
      if (!groups[key]) {
        groups[key] = {
          monthYear: `${reward.monthName} ${reward.year}`,
          month: reward.month,
          year: reward.year,
          transactions: [],
        };
      }

      if (allTransactions) {
        const customerTransactions = allTransactions.filter(
          (t) =>
            t.customerId === reward.customerId &&
            dayjs(t.purchaseDate).month() === reward.month &&
            dayjs(t.purchaseDate).year() === reward.year
        );

        customerTransactions.forEach((transaction) => {
          groups[key].transactions.push({
            customerId: reward.customerId,
            customerName: reward.customerName,
            transactionId: transaction.transactionId,
            amountSpent: transaction.price,
            transactionDate: transaction.purchaseDate,
            transactionYear: dayjs(transaction.purchaseDate).year(),
            rewardPoints: calculateRewardPoints(transaction.price),
          });
        });
      }
    });

    return Object.values(groups).sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return a.month - b.month;
    });
  }, [monthlyRewards, allTransactions]);

  // No need for additional filtering since data is already filtered by date range in Dashboard
  if (groupedByMonth.length === 0) {
    return (
      <Paper
        elevation={2}
        className="card-container"
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No monthly rewards data available for the selected period
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 600, color: "#2c3e50", mb: 3 }}
      >
        📅 Monthly Rewards by Month
      </Typography>

      {groupedByMonth.map((group) => {
        const rows = group.transactions.map((transaction, idx) => ({
          id: `${transaction.transactionId}-${idx}`,
          ...transaction,
        }));

        return (
          <Box key={`${group.year}-${group.month}`} sx={{ mb: 3 }}>
            <ReusableTable
              title={`${group.monthYear} - Monthly Transaction Report`}
              columns={columns}
              rows={rows}
              isLoading={isLoading}
              getRowId={(row) => row.id}
            />
          </Box>
        );
      })}
    </Box>
  );
};

MonthlyRewardsByMonth.propTypes = {
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
  dateRange: PropTypes.shape({
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
  }),
  allTransactions: PropTypes.array,
};

export default MonthlyRewardsByMonth;
