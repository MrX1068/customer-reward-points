import * as React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Paper } from "@mui/material";

// Custom overlay shown when no data is available
function CustomNoRowsOverlay({ title }) {
  return (
    <div style={{ padding: 32, textAlign: "center", color: "#888" }}>
      No {title ? title.toLowerCase() : "data"} found.
    </div>
  );
}

const ReusableTable = ({
  title,
  columns,
  rows,
  isLoading,
  getRowId,
  ...dataGridProps
}) => {
  const [search, setSearch] = React.useState(""); // Search filter state

  // Filter rows based on search input - searches all string fields
  const filteredRows = React.useMemo(() => {
    let filtered = rows;

    // Apply search filter if search term exists
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          String(row[col.field] || "")
            .toLowerCase()
            .includes(lower)
        )
      );
    }

    return filtered;
  }, [rows, search, columns]);

  const hasActiveFilters = search;

  return (
      <Paper
        elevation={2}
        className="card-container"
        sx={{
          p: 3,
          mb: 3
        }}
      >
      {title && <h3>{title}</h3>}

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {hasActiveFilters && (
              <Chip
                label={`${filteredRows.length} of ${rows.length} records`}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>

          <TextField
            size="small"
            variant="outlined"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 250 }}
          />
        </Box>
      </Box>

        <div className="table-wrapper">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={getRowId}
            loading={isLoading}
            slots={{ noRowsOverlay: () => <CustomNoRowsOverlay title={title} /> }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
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
            {...dataGridProps}
          />
        </div>
      </Paper>
  );
};

ReusableTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  getRowId: PropTypes.func,
};

export default ReusableTable;
