import * as React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const columns = [
  { field: "customerId", headerName: "Customer ID", flex: 1, sortable: true },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  { field: "monthName", headerName: "Month", flex: 1, sortable: true },
  { field: "year", headerName: "Year", flex: 1, sortable: true },
  {
    field: "rewardPoints",
    headerName: "Reward Points",
    flex: 1,
    sortable: true,
  },
];

function MonthlyRewardsTable({ monthlyRewards, isLoading }) {
  const rows = React.useMemo(
    () =>
      monthlyRewards.map((r, idx) => ({
        id: `${r.customerId}-${r.year}-${r.month}-${idx}`,
        ...r,
      })),
    [monthlyRewards]
  );

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
      <h3>Monthly Rewards</h3>
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
          disableSelectionOnClick
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

MonthlyRewardsTable.propTypes = {
  monthlyRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      month: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
      monthName: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default MonthlyRewardsTable;
