import * as React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const columns = [
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
    sortable: true,
  },
  {
    field: "rewardPoints",
    headerName: "Total Reward Points",
    flex: 1,
    sortable: true,
  },
];

function TotalRewardsTable({ totalRewards, isLoading }) {
  const rows = React.useMemo(
    () =>
      totalRewards.map((r, idx) => ({
        id: r.customerId || idx,
        ...r,
      })),
    [totalRewards]
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
      <h3>Total Rewards</h3>

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

TotalRewardsTable.propTypes = {
  totalRewards: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default TotalRewardsTable;
