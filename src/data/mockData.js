import log from "../utils/logger";

// Fetch transaction data from mock JSON file in public folder
export const fetchTransactions = async () => {
  try {
    // Fetch data from public/mockData.json
    const response = await fetch("/mockData.json");
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse JSON response and return copy of data
    const mockTransactions = await response.json();
    return [...mockTransactions]; // Return array copy to prevent mutations
  } catch (error) {
    log.error("Failed to fetch transactions:", error);
    throw error; // Re-throw for handling by caller
  }
};
