import dayjs from "dayjs";
import { formatMonthName } from "./formatters";

// Calculate reward points for a single purchase based on business rules
export const calculateRewardPoints = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return 0;
  if (amount <= 50) return 0; // No points for purchases $50 and under
  
  let points = 0;
  
  // 1 point per dollar between $50.01 and $100
  if (amount > 50) {
    const pointsFrom50To100 = Math.min(amount - 50, 50);
    points += pointsFrom50To100;
  }
  
  // 2 points per dollar over $100
  if (amount > 100) {
    const pointsOver100 = (amount - 100) * 2;
    points += pointsOver100;
  }
  
  return Math.floor(points); // Return whole points only
};

// Group transactions by month and year for monthly analysis
export const groupTransactionsByMonth = (transactions) => {
  return transactions.reduce((groups, transaction) => {
    const date = dayjs(transaction.purchaseDate); // Use dayjs instead of Date
    const month = date.month(); // 0-based month
    const year = date.year();
    const key = `${year}-${month}`; // Create month key
    
    // Initialize month group if doesn't exist
    if (!groups[key]) groups[key] = [];
    groups[key].push(transaction);
    return groups;
  }, {});
};

/**
 * Calculates total reward points for each month for a customer.
 * @param {Array} transactions - List of a customer's transactions.
 * @returns {Array} - [{ month, year, rewardPoints, monthName }, ...]
 */
export const calculateMonthlyRewards = (transactions) => {
  const monthlyGroups = groupTransactionsByMonth(transactions);
  return Object.entries(monthlyGroups).map(([key, monthTransactions]) => {
    const [year, month] = key.split("-").map(Number);
    const totalPoints = monthTransactions.reduce(
      (sum, transaction) => sum + calculateRewardPoints(transaction.price),
      0
    );
    return {
      month,
      year,
      rewardPoints: totalPoints,
      monthName: formatMonthName(month), // Use shared formatter for month name
    };
  });
};

/**
 * Calculates total reward points for all transactions of a customer.
 * @param {Array} transactions - List of a customer's transactions.
 * @returns {number} - Total reward points for the customer.
 */
export const calculateTotalRewards = (transactions) => {
  return transactions.reduce(
    (total, transaction) => total + calculateRewardPoints(transaction.price),
    0
  );
};
