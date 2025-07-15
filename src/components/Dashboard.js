import React, { useState, useEffect, useMemo } from "react";
import { fetchTransactions } from "../data/mockData";
import {
  groupTransactionsByCustomer,
  getAllMonthlyRewards,
  getAllTotalRewards,
} from "../utils/dataProcessing";
import TransactionsTable from "./TransactionsTable";
import MonthlyRewardsTable from "./MonthlyRewardsTable";
import TotalRewardsTable from "./TotalRewardsTable";
import ErrorMessage from "./ErrorMessage";
import log from "../utils/logger";
import { Grid } from "@mui/material";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      log.info("Fetching transactions...");
      const data = await fetchTransactions();
      setTransactions(data);
      setIsLoading(false);
      log.info("Transactions fetched successfully", data);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to load transaction data. Please try again.");
      log.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    log.info("Dashboard mounted");
    fetchData();
  }, []);

  const customerGroups = useMemo(
    () => groupTransactionsByCustomer(transactions),
    [transactions]
  );
  const monthlyRewards = useMemo(
    () => getAllMonthlyRewards(customerGroups),
    [customerGroups]
  );
  const totalRewards = useMemo(
    () => getAllTotalRewards(customerGroups),
    [customerGroups]
  );

  const handleRetry = () => {
    fetchData();
  };

  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Customer Rewards Program</h1>
          <p>Track and calculate reward points for customer transactions</p>
        </header>
        <main className="app-main">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Customer Rewards Program</h1>
        <p>Track and calculate reward points for customer transactions</p>
        <div className="rewards-info">
          <div className="rewards-info-header">
            <span className="rewards-trophy" role="img" aria-label="trophy">
              🏆
            </span>
            <span className="rewards-title">Rewards Calculation Rules</span>
          </div>
          <ul>
            <li>2 points for every dollar spent over $100</li>
            <li>1 point for every dollar spent between $50 and $100</li>
            <li>No points for purchases under $50</li>
          </ul>
        </div>
      </header>
      <main className="app-main">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TotalRewardsTable
              totalRewards={totalRewards}
              isLoading={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MonthlyRewardsTable
              monthlyRewards={monthlyRewards}
              isLoading={isLoading}
            />
          </Grid>
          <Grid size={12}>
            <TransactionsTable
              transactions={transactions}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Dashboard;
