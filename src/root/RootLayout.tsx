import BottomNavigation from '@/components/shared/BottomNavigation'
import SideNavigation from '@/components/shared/SideNavigation'
import TopNavigation from '@/components/shared/TopNavigation'
import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout: React.FC<any> = () => {
  return (
    <div className='w-full md:flex relative'>
      <TopNavigation />
      <SideNavigation />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

      <BottomNavigation />
    </div>
  )
}

export default RootLayout