import * as React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { calculateRewardPoints } from "../utils/rewardsCalculator";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const columns = [
  {
    field: "transactionId",
    headerName: "Transaction ID",
    flex: 1,
    sortable: true,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  {
    field: "purchaseDate",
    headerName: "Purchase Date",
    flex: 1,
    sortable: true,
    valueFormatter: (params) =>
      params
        ? new Date(params).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "",
  },
  {
    field: "productPurchased",
    headerName: "Product Purchased",
    flex: 1,
    sortable: true,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    sortable: true,
    valueFormatter: (params) => {
      const value = Number(params);
      console.log("val price ", params);
      return !isNaN(value) ? `$${value.toFixed(2)}` : "";
    },
  },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    flex: 1,
    sortable: true,
  },
];

function TransactionsTable({ transactions, isLoading }) {
  // Add rewardPoints to each row for display
  const rows = React.useMemo(
    () =>
      transactions.map((t, idx) => ({
        id: t.transactionId || idx,
        ...t,
        rewardPoints: calculateRewardPoints(t.price),
      })),
    [transactions]
  );

  // Global search/filter state
  const [search, setSearch] = React.useState("");
  const filteredRows = React.useMemo(() => {
    if (!search) return rows;
    const lower = search.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) =>
        String(row[col.field] || "")
          .toLowerCase()
          .includes(lower)
      )
    );
  }, [rows, search]);

  return (
    <div className="table-container">
      <h3>Transactions</h3>

      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>
      <div className="table-wrapper">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
          loading={isLoading}
          sx={{
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              background: "#f3f4f6",
              fontWeight: 700,
              fontSize: "1.05rem",
            },
            "& .MuiDataGrid-row:hover": {
              background: "#f0f4ff",
            },
          }}
        />
      </div>
    </div>
  );
}

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      purchaseDate: PropTypes.string.isRequired,
      productPurchased: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default TransactionsTable;
