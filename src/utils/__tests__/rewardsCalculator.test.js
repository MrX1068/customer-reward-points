
import { calculateRewardPoints, calculateMonthlyRewards, calculateTotalRewards } from '../rewardsCalculator';

describe('calculateRewardPoints', () => {
  it('returns 0 for purchases <= $50', () => {
    expect(calculateRewardPoints(0)).toBe(0);
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(49.99)).toBe(0);
  });

  it('returns correct points for $75', () => {
    expect(calculateRewardPoints(75)).toBe(25);
  });

  it('returns correct points for $120', () => {
    expect(calculateRewardPoints(120)).toBe(90);
  });

  it('returns correct points for $1000', () => {
    expect(calculateRewardPoints(1000)).toBe(1850);
  });

  it('handles decimals correctly (floors points)', () => {
    expect(calculateRewardPoints(100.2)).toBe(50);
    expect(calculateRewardPoints(100.4)).toBe(50);
    expect(calculateRewardPoints(120.99)).toBe(91);
  });

  it('returns 0 for negative values', () => {
    expect(calculateRewardPoints(-10)).toBe(0);
  });
  it('returns 0 for NaN', () => {
    expect(calculateRewardPoints(NaN)).toBe(0);
  });
});

describe('calculateMonthlyRewards', () => {
  const transactions = [
    { purchaseDate: '2023-12-01', price: 120 },
    { purchaseDate: '2023-12-15', price: 75 },
    { purchaseDate: '2024-01-10', price: 200 },
    { purchaseDate: '2024-01-20', price: 45 },
  ];

  it('groups and sums rewards by month/year', () => {
    const result = calculateMonthlyRewards(transactions);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ year: 2023, month: 11, rewardPoints: 115 }),
        expect.objectContaining({ year: 2024, month: 0, rewardPoints: 250 }),
      ])
    );
  });
});

describe('calculateTotalRewards', () => {
  it('sums all reward points for a customer', () => {
    const transactions = [
      { price: 120 },
      { price: 75 },
      { price: 45 },
    ];
    expect(calculateTotalRewards(transactions)).toBe(115);
  });

  it('returns 0 for empty transactions', () => {
    expect(calculateTotalRewards([])).toBe(0);
  });
}); 