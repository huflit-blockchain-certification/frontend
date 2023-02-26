import * as React from 'react'
import { Table } from 'flowbite-react'
const { Head, HeadCell, Body, Row, Cell } = Table

export interface TableProps {}

export default function TableData(props: TableProps) {
  return (
    <Table>
      <Head>
        <HeadCell>Product name</HeadCell>
        <HeadCell>Color</HeadCell>
        <HeadCell>Category</HeadCell>
        <HeadCell>Price</HeadCell>
        <HeadCell>
          <span className="sr-only">Edit</span>
        </HeadCell>
      </Head>
      <Body className="divide-y">
        <Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Apple MacBook Pro 17
          </Cell>
          <Cell>Sliver</Cell>
          <Cell>Laptop</Cell>
          <Cell>$2999</Cell>
          <Cell>
            <a
              href="/tables"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Edit
            </a>
          </Cell>
        </Row>
        <Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Microsoft Surface Pro
          </Cell>
          <Cell>White</Cell>
          <Cell>Laptop PC</Cell>
          <Cell>$1999</Cell>
          <Cell>
            <a
              href="/tables"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Edit
            </a>
          </Cell>
        </Row>
        <Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Magic Mouse 2
          </Cell>
          <Cell>Black</Cell>
          <Cell>Accessories</Cell>
          <Cell>$99</Cell>
          <Cell>
            <a
              href="/tables"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Edit
            </a>
          </Cell>
        </Row>
      </Body>
    </Table>
  )
}
