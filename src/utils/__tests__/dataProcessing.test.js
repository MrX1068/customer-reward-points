import { 
  groupTransactionsByCustomer, 
  getAllMonthlyRewards, 
  getAllTotalRewards,
  filterTransactionsByDateRange 
} from '../dataProcessing';
import dayjs from 'dayjs';

describe('groupTransactionsByCustomer', () => {
  it('groups transactions by customerId', () => {
    const transactions = [
      { customerId: 'A', customerName: 'Alice', price: 100 },
      { customerId: 'B', customerName: 'Bob', price: 200 },
      { customerId: 'A', customerName: 'Alice', price: 50 },
    ];
    const groups = groupTransactionsByCustomer(transactions);
    expect(Object.keys(groups)).toEqual(['A', 'B']);
    expect(groups['A'].transactions.length).toBe(2);
    expect(groups['B'].transactions.length).toBe(1);
  });

  it('handles empty input', () => {
    expect(groupTransactionsByCustomer([])).toEqual({});
  });
});

describe('filterTransactionsByDateRange', () => {
  const transactions = [
    { purchaseDate: '2023-12-01', price: 100, customerId: 'A' },
    { purchaseDate: '2024-01-15', price: 200, customerId: 'B' },
    { purchaseDate: '2024-02-20', price: 150, customerId: 'A' },
  ];

  it('filters transactions within date range', () => {
    const result = filterTransactionsByDateRange(transactions, '2024-01-01', '2024-01-31');
    expect(result).toHaveLength(1);
    expect(result[0].customerId).toBe('B');
  });

  it('returns all transactions when no date range provided', () => {
    const result = filterTransactionsByDateRange(transactions, null, null);
    expect(result).toHaveLength(3);
  });

  it('returns empty array when no transactions match date range', () => {
    const result = filterTransactionsByDateRange(transactions, '2025-01-01', '2025-01-31');
    expect(result).toHaveLength(0);
  });

  it('handles edge case dates correctly', () => {
    const result = filterTransactionsByDateRange(transactions, '2023-12-01', '2023-12-01');
    expect(result).toHaveLength(1);
    expect(result[0].customerId).toBe('A');
  });
});

describe('getAllMonthlyRewards', () => {
  it('returns monthly rewards with total amount spent for all customers', () => {
    const customerGroups = {
      A: {
        customerId: 'A',
        customerName: 'Alice',
        transactions: [
          { purchaseDate: '2023-12-01', price: 120 }, // 90 points
          { purchaseDate: '2023-12-15', price: 75 },  // 25 points
        ]
      },
      B: {
        customerId: 'B',
        customerName: 'Bob',
        transactions: [
          { purchaseDate: '2024-01-10', price: 200 }, // 250 points
        ]
      }
    };
    const result = getAllMonthlyRewards(customerGroups);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ 
          customerId: 'A', 
          rewardPoints: 115,
          totalAmountSpent: 195 // 120 + 75
        }),
        expect.objectContaining({ 
          customerId: 'B', 
          rewardPoints: 250,
          totalAmountSpent: 200
        })
      ])
    );
  });

  it('handles customers with no transactions', () => {
    const customerGroups = {};
    const result = getAllMonthlyRewards(customerGroups);
    expect(result).toEqual([]);
  });
});

describe('getAllTotalRewards', () => {
  it('returns total rewards with total amount spent for all customers', () => {
    const customerGroups = {
      A: {
        customerId: 'A',
        customerName: 'Alice',
        transactions: [
          { price: 120 }, // 90 points
          { price: 75 },  // 25 points
        ]
      },
      B: {
        customerId: 'B',
        customerName: 'Bob',
        transactions: [
          { price: 200 }, // 250 points
        ]
      }
    };
    const result = getAllTotalRewards(customerGroups);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ 
          customerId: 'A', 
          rewardPoints: 115,
          totalAmountSpent: 195 // 120 + 75
        }),
        expect.objectContaining({ 
          customerId: 'B', 
          rewardPoints: 250,
          totalAmountSpent: 200
        })
      ])
    );
  });

  it('returns empty array for no customers', () => {
    expect(getAllTotalRewards({})).toEqual([]);
  });

  it('handles transactions with missing prices', () => {
    const customerGroups = {
      A: {
        customerId: 'A',
        customerName: 'Alice',
        transactions: [
          { price: 100 },
          { price: null }, // Should be treated as 0
          { price: undefined }, // Should be treated as 0
        ]
      }
    };
    const result = getAllTotalRewards(customerGroups);
    expect(result[0].totalAmountSpent).toBe(100);
  });
});