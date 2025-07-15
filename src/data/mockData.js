import mockTransactions from "./mockData.json";

/**
 * Simulate API call to fetch transactions
 * @returns {Promise<Array>} - Promise that resolves to transactions array
 */
export const fetchTransactions = async () => {
  return [...mockTransactions];
};
