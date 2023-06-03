import React from 'react'

const Download = ({ filePath, fileName, title }: any) => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = filePath
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
        focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 
        dark:hover:bg-green-700 dark:focus:ring-green-800"
      onClick={handleDownload}
    >
      {title}
    </button>
  )
}

export { Download }
