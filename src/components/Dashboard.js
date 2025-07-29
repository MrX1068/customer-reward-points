import { useState, useMemo, useCallback } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { fetchTransactions } from "../data/mockData";
import {
  groupTransactionsByCustomer,
  getAllMonthlyRewards,
  getAllTotalRewards,
  filterTransactionsByDateRange,
} from "../utils/dataProcessing";
import TransactionsTable from "./TransactionsTable";
import MonthlyRewardsTable from "./MonthlyRewardsTable";
import MonthlyRewardsByMonth from "./MonthlyRewardsByMonth";
import TotalRewardsTable from "./TotalRewardsTable";
import DateRangeFilter from "./DateRangeFilter";
import ErrorMessage from "./ErrorMessage";
import log from "../utils/logger";

const Dashboard = () => {
  // Single state for filtered transactions
  const [transactions, setTransactions] = useState([]);
  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);
  // Error message state
  const [error, setError] = useState(null);
  // Current date filter applied
  const [dateFilter, setDateFilter] = useState(null);
  // Track if data has been loaded
  const [hasData, setHasData] = useState(false);

  // Fetch and filter transaction data based on date range
  const fetchFilteredData = async (fromDate, toDate) => {
    try {
      setIsLoading(true);
      setError(null);
      log.info("Fetching transactions with date filter:", { fromDate, toDate });

      // Fetch all transactions from API
      const allData = await fetchTransactions();

      // Filter transactions by date range
      const filteredData = filterTransactionsByDateRange(
        allData,
        fromDate,
        toDate
      );

      setTransactions(filteredData);
      setHasData(true);
      log.info("Filtered transactions loaded successfully", filteredData);
    } catch (error) {
      setError("Failed to load transaction data. Please try again.");
      log.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply date range filter and fetch data - memoized to prevent unnecessary re-renders
  const handleFilterApply = useCallback((filterData) => {
    log.info("Applying filter:", filterData);
    setDateFilter(filterData);
    fetchFilteredData(filterData.fromDate, filterData.toDate);
  }, []); // No dependencies needed since fetchFilteredData is stable

  // Reset filters to default 3-month range (DateRangeFilter will auto-apply)
  const handleFilterReset = useCallback(() => {
    log.info("Resetting filter to default 3-month range");
    // Don't clear data - DateRangeFilter will auto-apply default filter
    setError(null);
  }, []); // No dependencies needed

  // Group transactions by customer
  const customerGroups = useMemo(
    () => groupTransactionsByCustomer(transactions),
    [transactions]
  );

  // Calculate monthly rewards for all customers
  const monthlyRewards = useMemo(
    () => getAllMonthlyRewards(customerGroups),
    [customerGroups]
  );

  // Calculate total rewards for all customers
  const totalRewards = useMemo(
    () => getAllTotalRewards(customerGroups),
    [customerGroups]
  );

  // Retry data fetch on error
  const handleRetry = () => {
    if (dateFilter) {
      fetchFilteredData(dateFilter.fromDate, dateFilter.toDate);
    }
  };

  // Show error message if data fetch fails
  if (error) {
    return (
      <div className="app">
        <main className="app-main">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="app-main">
        {/* Main App Title */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            pt: 2,
            pb: 1,
            borderBottom: "2px solid #e3f2fd",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#1976d2",
              mb: 1,
              fontSize: { xs: "1.75rem", sm: "2.125rem" },
            }}
          >
            🏆 Customer Rewards Program
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#666",
              fontStyle: "italic",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            Track transactions and calculate reward points
          </Typography>
        </Box>

        <DateRangeFilter
          onFilterApply={handleFilterApply}
          onFilterReset={handleFilterReset}
          isLoading={isLoading}
        />

        <Grid container spacing={2}>
          {hasData && (
            <Grid size={12}>
              <MonthlyRewardsByMonth
                monthlyRewards={monthlyRewards}
                isLoading={isLoading}
                dateRange={dateFilter}
                allTransactions={transactions}
              />
            </Grid>
          )}

          <Grid size={12}>
            <MonthlyRewardsTable
              monthlyRewards={hasData ? monthlyRewards : []}
              isLoading={isLoading}
            />
          </Grid>

          <Grid size={12}>
            <TotalRewardsTable
              totalRewards={hasData ? totalRewards : []}
              isLoading={isLoading}
            />
          </Grid>

          <Grid size={12}>
            <TransactionsTable
              transactions={hasData ? transactions : []}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Dashboard;
