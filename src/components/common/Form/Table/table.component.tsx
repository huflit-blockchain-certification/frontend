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
import { Button } from '@mui/material'

export interface TableProps {
  columns: GridColDef<any>[]
  listData: Array<any>
  loading: boolean
  rowSelectionModel: GridRowSelectionModel
  handleRowSelection?: (rowSelectionModel: GridRowSelectionModel) => void
  handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
  onFilterChange: (filterModel: GridFilterModel) => void
  onDeleteRowClick?: () => void
  IssueModal?: React.ReactNode
  pagination: GridPaginationModel
  totalPage?: number
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
  onDeleteRowClick,
  IssueModal,
  totalPage,
  ...rest
}: TableProps) {
  console.log(rowSelectionModel)
  return (
    <div className="flex flex-col gap-3">
      <Box sx={{ height: 700, width: '100%', display: 'table', tableLayout: 'fixed' }}>
        {rowSelectionModel?.length > 0 && (
          <div className="flex gap-1">
            {IssueModal && IssueModal}
            {onDeleteRowClick && (
              <Button variant="outlined" color="error" className="mb-2" onClick={onDeleteRowClick}>
                Xóa
              </Button>
            )}
          </div>
        )}

        <DataGrid
          rows={listData ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={(totalPage && pagination?.pageSize * totalPage) || 20}
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
