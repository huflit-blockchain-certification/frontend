import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

interface Columns {
  title: string
  dataIndex: string
  render?: (key?: string, record?: Object) => React.ReactNode
}
export interface TableProps {
  columns: GridColDef[]
  rows: any[]
}

export default function TableData({ columns, rows }: TableProps) {
  return (
    <div className="flex flex-col gap-3">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  )
}
