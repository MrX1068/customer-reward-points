import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, Button, Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateRangeFilter = ({ onFilterApply, onFilterReset, isLoading }) => {
  const today = dayjs(); // Current date for validation
  const threeMonthsAgo = today.subtract(3, 'month'); // Default start date - 3 months ago
  const hasInitialized = useRef(false); // Track if initial filter has been applied
  
  const [fromDate, setFromDate] = useState(threeMonthsAgo); // Default to 3 months ago
  const [toDate, setToDate] = useState(today); // Default to today
  const [dateError, setDateError] = useState(""); // Store validation error message

  // Shared validation logic - returns error message or null
  const validateDateLogic = (newFromDate, newToDate) => {
    // Prevent future date selection
    if (newFromDate && newFromDate.isAfter(today)) {
      return "Cannot select future dates";
    }
    if (newToDate && newToDate.isAfter(today)) {
      return "Cannot select future dates";
    }

    // Ensure from date is before to date
    if (newFromDate && newToDate && newFromDate.isAfter(newToDate)) {
      return "From date cannot be after To date";
    }

    return null; // No error
  };

  // Real-time validation during date selection - allows partial selection
  const validateDatesOnChange = (
    newFromDate = fromDate,
    newToDate = toDate
  ) => {
    // Clear error when no dates selected
    if (!newFromDate && !newToDate) {
      setDateError("");
      return true;
    }

    const error = validateDateLogic(newFromDate, newToDate);
    setDateError(error || "");
    return !error;
  };

  // Validation for filter submission - requires both dates
  const validateDatesForSubmit = () => {
    // Both dates required for filtering
    if (!fromDate || !toDate) {
      setDateError("Both From and To dates are required");
      return false;
    }

    const error = validateDateLogic(fromDate, toDate);
    setDateError(error || "");
    return !error;
  };

  // Handle from date selection with real-time validation
  const handleFromDateChange = (newDate) => {
    setFromDate(newDate);
    validateDatesOnChange(newDate, toDate);
  };

  // Handle to date selection with real-time validation
  const handleToDateChange = (newDate) => {
    setToDate(newDate);
    validateDatesOnChange(fromDate, newDate);
  };

  // Apply date filter after validation
  const handleFilterApply = () => {
    if (!validateDatesForSubmit()) {
      return;
    }

    // Send formatted dates to parent component
    onFilterApply({
      fromDate: fromDate.format("YYYY-MM-DD"),
      toDate: toDate.format("YYYY-MM-DD"),
    });
  };

  // Reset all filter states to default 3-month range
  const handleReset = () => {
    setFromDate(threeMonthsAgo); // Reset to 3 months ago
    setToDate(today); // Reset to today
    setDateError("");
    
    // Auto-apply default filter after reset
    onFilterApply({
      fromDate: threeMonthsAgo.format("YYYY-MM-DD"),
      toDate: today.format("YYYY-MM-DD"),
    });
    
    onFilterReset();
  };

  const isFilterReady = fromDate && toDate && !dateError; // Check if filter can be applied

  // Auto-apply default filter when component mounts (only once)
  useEffect(() => {
    // Apply default 3-month filter on component mount only once
    if (!hasInitialized.current && fromDate && toDate && !dateError) {
      hasInitialized.current = true; // Mark as initialized
      onFilterApply({
        fromDate: fromDate.format("YYYY-MM-DD"),
        toDate: toDate.format("YYYY-MM-DD"),
      });
    }
  }, [fromDate, toDate, dateError, onFilterApply]); // Include all dependencies but only run once due to ref guard

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={2}
        className="card-container"
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 600, color: "#2c3e50" }}
        >
          📅 Filter by Date Range
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={handleFromDateChange}
            maxDate={today}
            disabled={isLoading}
            slotProps={{
              textField: {
                size: "small",
                sx: { minWidth: 140 },
                error: !!dateError,
              },
            }}
          />

          <DatePicker
            label="To Date"
            value={toDate}
            onChange={handleToDateChange}
            maxDate={today}
            disabled={isLoading}
            slotProps={{
              textField: {
                size: "small",
                sx: { minWidth: 140 },
                error: !!dateError,
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleFilterApply}
              disabled={isLoading || !isFilterReady}
              sx={{ minWidth: 80 }}
            >
              {isLoading ? "Filtering..." : "Apply Filter"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={isLoading}
              sx={{ minWidth: 80 }}
            >
              Reset Filter
            </Button>
          </Box>
        </Box>

        {dateError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {dateError}
          </Alert>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

DateRangeFilter.propTypes = {
  onFilterApply: PropTypes.func.isRequired,
  onFilterReset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default DateRangeFilter;
