import * as React from 'react'
import csvtojson from 'csvtojson'
import Swal from 'sweetalert2'
import { Toast } from '../../Toast/response.component'

export interface CSVInputProps {
  requestAfterConfirmCSV?: (data: any[]) => Promise<any>
  titleCSV?: string
}

export function CSVInput({ requestAfterConfirmCSV, titleCSV }: CSVInputProps) {
  const handleCSV = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      const contents = reader.result as string
      const data = await csvtojson({ ignoreEmpty: true }).fromString(contents)
      const confirmResult = await Swal.fire({
        title: `Bạn có chắc muốn nhập ${data?.length || 0} dữ liệu từ excel không ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })

      console.log(data)
      if (confirmResult.isConfirmed) {
        if (!data?.length) return
        if (!requestAfterConfirmCSV) return
        const response = await requestAfterConfirmCSV(data)
        if (!response) return
        await Toast.fire({ title: 'Nhập thành công!', icon: 'success' })
      }
    }
    reader.readAsText(file)
  }
  return (
    <>
      <label
        htmlFor="csv"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
        focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 
        dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {titleCSV || 'Excel'}
        <input
          id="csv"
          type="file"
          onChange={handleCSV}
          accept=".csv"
          value=""
          className="hidden"
        />
      </label>
    </>
  )
}
