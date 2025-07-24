import {
  calculateMonthlyRewards,
  calculateTotalRewards,
} from "./rewardsCalculator";
import dayjs from "dayjs";

// Filter transactions within a specific date range
export function filterTransactionsByDateRange(transactions, fromDate, toDate) {
  if (!fromDate || !toDate) {
    return transactions; // Return all if no filter dates provided
  }

  const startDate = dayjs(fromDate).startOf('day'); // Start of from date
  const endDate = dayjs(toDate).endOf('day'); // End of to date

  // Filter transactions that fall within the date range
  return transactions.filter((transaction) => {
    const transactionDate = dayjs(transaction.purchaseDate);
    return transactionDate.isAfter(startDate.subtract(1, 'ms')) && 
           transactionDate.isBefore(endDate.add(1, 'ms'));
  });
}

// Group transactions by customer ID for easier processing
export function groupTransactionsByCustomer(transactions) {
  return transactions.reduce((groups, transaction) => {
    const { customerId, customerName } = transaction;
    
    // Create new customer group if doesn't exist
    if (!groups[customerId]) {
      groups[customerId] = {
        customerId,
        customerName,
        transactions: [],
      };
    }
    
    // Add transaction to customer's group
    groups[customerId].transactions.push(transaction);
    return groups;
  }, {});
}

/**
 * Computes monthly rewards for all customers.
 * @param {Object} customerGroups - Output of groupTransactionsByCustomer.
 * @returns {Array} - List of monthly reward summaries for each customer.
 */
export function getAllMonthlyRewards(customerGroups) {
  return Object.values(customerGroups).flatMap((customer) => {
    const monthlyData = calculateMonthlyRewards(customer.transactions);
    return monthlyData.map((monthData) => {
      // Calculate total amount spent for this month
      const monthTransactions = customer.transactions.filter(t => {
        const transactionDate = dayjs(t.purchaseDate);
        return transactionDate.month() === monthData.month && 
               transactionDate.year() === monthData.year;
      });
      
      const totalAmountSpent = monthTransactions.reduce((sum, t) => sum + (t.price || 0), 0);
      
      return {
        ...monthData,
        customerId: customer.customerId,
        customerName: customer.customerName,
        totalAmountSpent: totalAmountSpent,
      };
    });
  });
}

/**
 * Computes total rewards for all customers.
 * @param {Object} customerGroups - Output of groupTransactionsByCustomer.
 * @returns {Array} - List of total reward summaries for each customer.
 */
export function getAllTotalRewards(customerGroups) {
  return Object.values(customerGroups).map((customer) => {
    const totalAmountSpent = customer.transactions.reduce(
      (sum, transaction) => sum + (transaction.price || 0),
      0
    );
    
    return {
      customerId: customer.customerId,
      customerName: customer.customerName,
      rewardPoints: calculateTotalRewards(customer.transactions),
      totalAmountSpent: totalAmountSpent,
    };
  });
}

