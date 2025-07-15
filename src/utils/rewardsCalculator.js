/**
 * Calculates reward points for a single purchase amount based on business rules.
 * @param {number} amount - Purchase amount in dollars.
 * @returns {number} Reward points earned for this transaction.
 */
export const calculateRewardPoints = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) return 0;
  if (amount <= 50) return 0;
  let points = 0;
  if (amount > 50) {
    // 1 point per dollar between $50.01 and $100
    const pointsFrom50To100 = Math.min(amount - 50, 50);
    points += pointsFrom50To100;
  }
  if (amount > 100) {
    // 2 points per dollar over $100
    const pointsOver100 = (amount - 100) * 2;
    points += pointsOver100;
  }
  return Math.floor(points);
};

/**
 * Groups transactions by month and year.
 * @param {Array} transactions - List of transaction objects.
 * @returns {Object} - { 'YYYY-M': [transactions, ...], ... }
 */
export const groupTransactionsByMonth = (transactions) => {
  return transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.purchaseDate);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month}`;
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
      monthName: new Date(year, month).toLocaleDateString("en-US", {
        month: "long",
      }),
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
