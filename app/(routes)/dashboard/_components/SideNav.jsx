"use client"
import Link  from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

function SideNav() {

    const menuList = [
        {
            id:1,
            name:'Dashboard', 
            icon:LayoutGrid,
            path:'/dashboard'
        },

        {
            id:2,
            name:'Budget', 
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },

        {
            id:3,
            name:'Expenses', 
            icon:ReceiptText,
            path:'/dashboard/expenses'
        },


    ]

    const path = usePathname();

    // useEffect(() => {
    //     console.log(path)
    // }, [path])

  return (
    <div  className='h-screen p-5 border shadow-sm'>
        <Image
        src={'/logo.svg'}
        alt='logo'
        width={160}
        height={100}/>
      
      <div className='mt-5'>
    {menuList.map((menu,index) => (
        <Link href={menu.path}>
        <h2 className={`flex gap-3 items-center font-medium p-5 cursor-pointer mb-2
                         rounded-md hover:text-primary hover:bg-blue-100 ${path==menu.path &&'bg-blue-100 text-primary '}`}>
            <menu.icon/>
            {menu.name}
        </h2>
        </Link>
    ))}
      </div>

      <div className='flex fixed bottom-10 gap-2 p-5 items-center'>
        <UserButton/> 
        Profile
      </div>
    </div>
  )
}

export default SideNav
