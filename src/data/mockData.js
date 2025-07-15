import mockTransactions from './mockData.json';
import { delay } from '../utils/delay';

/**
 * Simulate API call to fetch transactions
 * @returns {Promise<Array>} - Promise that resolves to transactions array
 */
export const fetchTransactions = async () => {
  await delay(2000);
  return [...mockTransactions];
};
