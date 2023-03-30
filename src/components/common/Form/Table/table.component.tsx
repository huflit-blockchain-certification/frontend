import * as React from 'react'
import Box from '@mui/material/Box'
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridToolbar,
} from '@mui/x-data-grid'

export interface TableProps {
  columns: GridColDef<any>[]
  listData: Array<any>
  loading: boolean
  rowSelectionModel: GridRowSelectionModel
  handleRowSelection?: (rowSelectionModel: GridRowSelectionModel) => void
  handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
  onFilterChange: (filterModel: GridFilterModel) => void
  pagination: GridPaginationModel
}

export default function TableData({
  columns,
  listData,
  loading,
  rowSelectionModel,
  handleRowSelection,
  handlePaginationModelChange,
  onFilterChange,
  pagination,
  ...rest
}: TableProps) {
  return (
    <div className="flex flex-col gap-3">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={listData ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={20}
          loading={loading}
          keepNonExistentRowsSelected
          disableColumnFilter
          paginationMode="server"
          rowSelectionModel={rowSelectionModel}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          disableColumnSelector
          onRowSelectionModelChange={handleRowSelection}
          onPaginationModelChange={handlePaginationModelChange}
          onFilterModelChange={onFilterChange}
          paginationModel={{ ...pagination, page: pagination?.page - 1 }}
          pageSizeOptions={[5]}
          filterMode="server"
          checkboxSelection
          disableRowSelectionOnClick
          {...rest}
        />
      </Box>
    </div>
  )
}
