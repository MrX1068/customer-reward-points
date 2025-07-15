import { groupTransactionsByCustomer, getAllMonthlyRewards, getAllTotalRewards } from '../dataProcessing';

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

describe('getAllMonthlyRewards', () => {
  it('returns monthly rewards for all customers', () => {
    const customerGroups = {
      A: {
        customerId: 'A',
        customerName: 'Alice',
        transactions: [
          { purchaseDate: '2023-12-01', price: 120 }, // 90
          { purchaseDate: '2023-12-15', price: 75 },  // 25
        ]
      },
      B: {
        customerId: 'B',
        customerName: 'Bob',
        transactions: [
          { purchaseDate: '2024-01-10', price: 200 }, // 250
        ]
      }
    };
    const result = getAllMonthlyRewards(customerGroups);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ customerId: 'A', rewardPoints: 115 }),
        expect.objectContaining({ customerId: 'B', rewardPoints: 250 })
      ])
    );
  });
});

describe('getAllTotalRewards', () => {
  it('returns total rewards for all customers', () => {
    const customerGroups = {
      A: {
        customerId: 'A',
        customerName: 'Alice',
        transactions: [
          { price: 120 }, // 90
          { price: 75 },  // 25
        ]
      },
      B: {
        customerId: 'B',
        customerName: 'Bob',
        transactions: [
          { price: 200 }, // 250
        ]
      }
    };
    const result = getAllTotalRewards(customerGroups);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ customerId: 'A', rewardPoints: 115 }),
        expect.objectContaining({ customerId: 'B', rewardPoints: 250 })
      ])
    );
  });

  it('returns empty array for no customers', () => {
    expect(getAllTotalRewards({})).toEqual([]);
  });
}); 