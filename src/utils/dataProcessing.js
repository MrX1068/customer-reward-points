import {
  calculateMonthlyRewards,
  calculateTotalRewards,
} from "./rewardsCalculator";

/**
 * Groups an array of transactions by customerId.
 * @param {Array} transactions - List of transaction objects.
 * @returns {Object} - { [customerId]: { customerId, customerName, transactions: [] } }
 */
export function groupTransactionsByCustomer(transactions) {
  return transactions.reduce((groups, transaction) => {
    const { customerId, customerName } = transaction;
    if (!groups[customerId]) {
      groups[customerId] = {
        customerId,
        customerName,
        transactions: [],
      };
    }
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
    return monthlyData.map((monthData) => ({
      ...monthData,
      customerId: customer.customerId,
      customerName: customer.customerName,
    }));
  });
}

/**
 * Computes total rewards for all customers.
 * @param {Object} customerGroups - Output of groupTransactionsByCustomer.
 * @returns {Array} - List of total reward summaries for each customer.
 */
export function getAllTotalRewards(customerGroups) {
  return Object.values(customerGroups).map((customer) => ({
    customerId: customer.customerId,
    customerName: customer.customerName,
    rewardPoints: calculateTotalRewards(customer.transactions),
  }));
}
