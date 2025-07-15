import * as React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
  }, [rows, search, columns]);

  return (
    <div className="table-container">
      {title && <h3>{title}</h3>}
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
    </div>
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