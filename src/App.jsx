import { useState, useEffect, useMemo } from "react";
import { fetchTransactions } from "./data/mockData";
import {
  groupTransactionsByCustomer,
  getAllMonthlyRewards,
  getAllTotalRewards,
} from "./utils/dataProcessing";
import TransactionsTable from "./components/TransactionsTable";
import MonthlyRewardsTable from "./components/MonthlyRewardsTable";
import TotalRewardsTable from "./components/TotalRewardsTable";
import ErrorMessage from "./components/ErrorMessage";
import ErrorBoundary from "./components/ErrorBoundary";
import log from "./utils/logger";

const App = () => {
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
    log.info("App mounted");
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
      <ErrorBoundary>
        <div className="app">
          <header className="app-header">
            <h1>Customer Rewards Program</h1>
            <p>Track and calculate reward points for customer transactions</p>
          </header>
          <main className="app-main">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </main>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
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
          <div className="tables-grid">
            <TotalRewardsTable
              totalRewards={totalRewards}
              isLoading={isLoading}
            />
            <MonthlyRewardsTable
              monthlyRewards={monthlyRewards}
              isLoading={isLoading}
            />
            <TransactionsTable
              transactions={transactions}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
