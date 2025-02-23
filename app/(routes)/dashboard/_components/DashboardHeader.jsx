import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='border p-5 shadow-sm flex justify-between'>
      <div>

      </div>
      <div>
        <UserButton/>
      </div>
    </div>
  )
}

export default DashboardHeader
