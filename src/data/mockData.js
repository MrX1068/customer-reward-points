/**
 * Mock data for rewards program demonstration
 * Contains 3 consecutive months of transactions (Dec 2023, Jan 2024, Feb 2024)
 */

export const mockTransactions = [
  // December 2023 transactions
  {
    transactionId: "TXN001",
    customerId: "CUST001",
    customerName: "John Smith",
    purchaseDate: "2023-12-05",
    productPurchased: "Gaming Laptop",
    price: 1200.5,
  },
  {
    transactionId: "TXN002",
    customerId: "CUST001",
    customerName: "John Smith",
    purchaseDate: "2023-12-15",
    productPurchased: "Wireless Mouse",
    price: 75.25,
  },
  {
    transactionId: "TXN003",
    customerId: "CUST002",
    customerName: "Sarah Johnson",
    purchaseDate: "2023-12-10",
    productPurchased: "Smartphone",
    price: 899.99,
  },
  {
    transactionId: "TXN004",
    customerId: "CUST003",
    customerName: "Mike Wilson",
    purchaseDate: "2023-12-20",
    productPurchased: "Headphones",
    price: 45.0,
  },
  {
    transactionId: "TXN005",
    customerId: "CUST003",
    customerName: "Mike Wilson",
    purchaseDate: "2023-12-25",
    productPurchased: "Gaming Console",
    price: 499.99,
  },

  // January 2024 transactions
  {
    transactionId: "TXN006",
    customerId: "CUST001",
    customerName: "John Smith",
    purchaseDate: "2024-01-08",
    productPurchased: "Monitor",
    price: 299.99,
  },
  {
    transactionId: "TXN007",
    customerId: "CUST002",
    customerName: "Sarah Johnson",
    purchaseDate: "2024-01-12",
    productPurchased: "Tablet",
    price: 349.5,
  },
  {
    transactionId: "TXN008",
    customerId: "CUST002",
    customerName: "Sarah Johnson",
    purchaseDate: "2024-01-18",
    productPurchased: "Keyboard",
    price: 125.75,
  },
  {
    transactionId: "TXN009",
    customerId: "CUST004",
    customerName: "Emily Davis",
    purchaseDate: "2024-01-22",
    productPurchased: "Laptop Stand",
    price: 35.0,
  },
  {
    transactionId: "TXN010",
    customerId: "CUST004",
    customerName: "Emily Davis",
    purchaseDate: "2024-01-28",
    productPurchased: "External Hard Drive",
    price: 89.99,
  },

  // February 2024 transactions
  {
    transactionId: "TXN011",
    customerId: "CUST001",
    customerName: "John Smith",
    purchaseDate: "2024-02-03",
    productPurchased: "Webcam",
    price: 65.5,
  },
  {
    transactionId: "TXN012",
    customerId: "CUST002",
    customerName: "Sarah Johnson",
    purchaseDate: "2024-02-10",
    productPurchased: "Printer",
    price: 199.99,
  },
  {
    transactionId: "TXN013",
    customerId: "CUST003",
    customerName: "Mike Wilson",
    purchaseDate: "2024-02-14",
    productPurchased: "Gaming Chair",
    price: 299.99,
  },
  {
    transactionId: "TXN014",
    customerId: "CUST004",
    customerName: "Emily Davis",
    purchaseDate: "2024-02-20",
    productPurchased: "USB Hub",
    price: 25.0,
  },
  {
    transactionId: "TXN015",
    customerId: "CUST005",
    customerName: "David Brown",
    purchaseDate: "2024-02-25",
    productPurchased: "Gaming Mouse",
    price: 79.99,
  },
];

/**
 * Simulate API call to fetch transactions
 * @returns {Promise<Array>} - Promise that resolves to transactions array
 */
export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockTransactions]);
    }, 1000);
  });
};
