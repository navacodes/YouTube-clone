import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import NoContent from "./NoContent";

const DataTable = ({ rowsData, theme, columns }) => {
  return (
    <>
      <DataGrid
        rows={rowsData.length !== 0 ? rowsData : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 30 },
          },
        }}
        pageSizeOptions={[30, 50, 100]}
        checkboxSelection
        sx={{
          borderLeft: "none",
          borderRight: "none",
          "& .MuiDataGrid-virtualScroller": {
            height: rowsData.length === 0 ? "55px" : "auto",
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            height: rowsData.length === 0 ? "auto" : "calc(100vh - 285px) !important",
          },
          "& .MuiDataGrid-cell": {
            maxHeight: "100% !important",
            ":focus, :focus-within": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-row": {
            maxHeight: "100% !important",
            padding: "8px 0px 8px 32px",
            margin: "10px 0",
            borderBottom: "1px solid #515151 !important",
            ":hover": {
              backgroundColor: theme.palette.studioDarkGray,
            },
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: `${theme.palette.studioDarkGray} !important`,
            ":hover": {
              backgroundColor: `${theme.palette.studioDarkGray} !important`,
            },
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #515151 !important",
            paddingLeft: "32px",
          },
          "& .MuiDataGrid-columnHeader": {
            ":focus,:focus-within": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-withBorderColor": {
            border: "none",
          },
        }}
      />
      {rowsData.length === 0 ? <NoContent /> : null}
    </>
  );
};

export default DataTable;
