import * as React from 'react'

interface Columns {
  title: string
  dataIndex: string
  render?: (key?: string, record?: Object) => React.ReactNode
}
export interface TableProps {
  columns: Array<Columns>
  data?: Array<any>
}

export default function TableData({ columns, data }: TableProps) {
  return <div className="flex flex-col gap-3"></div>
}
