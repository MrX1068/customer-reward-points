# Customer Rewards Program

## 📖 Project Explanation

The **Customer Rewards Program** is a React + Vite application that tracks customer transactions and calculates reward points based on configurable business rules. The app demonstrates modern React development practices, including component-based architecture, state management, error handling, and responsive design.

**Reward Calculation Rules:**
- **2 points** for every dollar spent over $100
- **1 point** for every dollar spent between $50 and $100
- **0 points** for purchases under $50

**Example:**  
A $120 purchase = 2×$20 + 1×$50 = **90 points**

The application displays:
- **Total rewards per customer**
- **Monthly rewards per customer**
- **Detailed transaction history**

It also handles loading and error states gracefully, providing a robust user experience.

---

## 📁 Folder Structure

```
src/
  components/
    Dashboard.js           # Main dashboard layout and logic
    ErrorBoundary.js       # Catches and displays UI errors
    ErrorMessage.js        # Shows error messages with retry
    LoadingSpinner.js      # Animated loading indicator
    MonthlyRewardsTable.js # Table for monthly rewards per customer
    TotalRewardsTable.js   # Table for total rewards per customer
    TransactionsTable.js   # Table for all transactions
    ReusableTable.js       # Shared table component for DRY table UI
  utils/
    rewardsCalculator.js      # Pure functions for reward calculations
    dataProcessing.js         # Data grouping and transformation utilities
    logger.js                 # Centralized logging utility
    __tests__/
      rewardsCalculator.test.js # Unit tests for rewards logic
      dataProcessing.test.js    # Unit tests for data processing
  data/
    mockData.js               # Mock transaction data fetcher
    mockData.json              # JSON dataset for transactions
  screenshots/
    main-dashboard.png         # Screenshot: main dashboard
    error-state.png            # Screenshot: error state
    empty-state.png            # Screenshot: empty state
    loading-state.png          # Screenshot: loading state
  App.js                       # Main application component
  App.css                      # Global styles
  index.js                     # React entry point
  logo.svg                     # App logo
  setupTests.js                # Test setup file
  reportWebVitals.js           # Web vitals reporting
```

---

## 🖼️ Screenshots


### 1. Main Dashboard (All Data Loaded)
![Main Dashboard](src/screenshots/main-dashboard.png)
- Shows all three tables: Total Rewards, Monthly Rewards, Transactions.

### 2. Error State
![Error State](src/screenshots/error-state.png)
- Shows error message and retry button when data fetch fails.

### 3. Empty State
![Empty State](src/screenshots/empty-state.png)
- Shows “No data available” message when there are no transactions.

---

## ℹ️ How to Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd customer-reward-points
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm start
   ```
4. **Open in your browser**
   Go to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

- **React 19** (with Create React App)
- **Material UI (MUI)** for UI components and DataGrid
- **CSS3** for custom styles
- **Jest & React Testing Library** for unit testing
- **JSON** for mock data

---


