import * as React from 'react'

export interface CardProps {}

export default function Card(props: any) {
  return (
    <a
      href="#"
      className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 
          dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="flex">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex-1">
          Bằng cử nhân CNTT
        </h5>
        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
          Đã xác nhận
        </span>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">Khóa tốt nghiệp 2021-2022</p>

      <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
        Chia sẻ
        <svg
          className="w-5 h-5 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
        </svg>
      </a>
    </a>
  )
}
