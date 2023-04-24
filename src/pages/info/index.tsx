import Card from '@/components/common/Card/card.component'
import { MainLayout } from '@/layouts'
import * as React from 'react'

export interface infoPageProps {}

export default function InfoPage(props: infoPageProps) {
  return (
    <div className="container py-5">
      <div className="flex flex-col gap-5">
        {/* //List Section */}
        <h4 className="text-2xl font-bold dark:text-white">Danh sách văn bằng</h4>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

InfoPage.Layout = MainLayout
