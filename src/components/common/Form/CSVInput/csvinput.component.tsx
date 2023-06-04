import React, { useState } from 'react'
import csvtojson from 'csvtojson'
import Swal from 'sweetalert2'
import { Toast } from '../../Toast/response.component'
import { errorMessage, successMessage } from '../../Toast/response.toast.component'
import { LoadingIndicator } from '../../LoadingIndicator/loadingIndicator.component'

export interface CSVInputProps {
  requestAfterConfirmCSV?: (data: any[]) => Promise<any>
  titleCSV?: string
  afterImport?: (data: any) => any
}

export function CSVInput({ requestAfterConfirmCSV, titleCSV, afterImport }: CSVInputProps) {
  const [loading, setLoading] = useState(false)
  const handleCSV = (event: React.ChangeEvent<HTMLInputElement>): void => {
    try {
      setLoading(true)
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

        if (confirmResult.isConfirmed) {
          if (!data?.length) return
          if (!requestAfterConfirmCSV) return
          const response = await requestAfterConfirmCSV(data)
          if (afterImport) {
            afterImport(response)
          }
          if (!response) return
        }
      }
      reader.readAsText(file)
      setLoading(false)
      successMessage('Nhập')
    } catch (err: any) {
      setLoading(false)
      errorMessage(err.message)
    }
  }
  if (loading) return <LoadingIndicator />
  return (
    <>
      <label
        htmlFor={titleCSV}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
        focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 
        dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {titleCSV || 'Excel'}
        <input
          id={titleCSV}
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
