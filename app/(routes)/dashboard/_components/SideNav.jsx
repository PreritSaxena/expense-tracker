"use client"
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ChevronFirst, ChevronLast, LayoutGrid, PiggyBank, ReceiptText } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

function SideNav() {
  const [expanded, setExpanded] = useState(false)
  const path = usePathname();

  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 2, name: 'Budget', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Expenses', icon: ReceiptText, path: '/dashboard/expenses' }
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {expanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setExpanded(false)} 
        />
      )}

      <div className={`fixed top-0 left-0 h-screen bg-white border-r shadow-md p-5 transition-all z-50
                      md:w-64 md:block ${expanded ? "w-64" : "w-16"} ${expanded ? "block" : "hidden md:block"}`}>

        <div className='flex gap-2 items-center'>
          <Image
            src={'/logo.svg'}
            alt='logo'
            width={160}
            height={100}
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0 md:w-32"}`}
          />

          {/* Show button only on mobile */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`p-1.5 ml-auto rounded-lg bg-gray-50 hover:bg-gray-100 md:hidden`}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Menu Items */}
        <div className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0 md:w-32"} mt-5`}>
          {menuList.map((menu) => (
            <Link key={menu.id} href={menu.path}>
              <h2
               onClick={() => setExpanded(false)} 
               className={`flex gap-3 items-center font-medium p-5 cursor-pointer mb-2
                              rounded-md hover:text-primary hover:bg-blue-100 ${path == menu.path && 'bg-blue-100 text-primary '}`}>
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        {/* User Profile */}
        <div className={`flex overflow-hidden transition-all ${expanded ? "w-32" : "w-0 md:w-32"} fixed bottom-10 gap-2 p-5 items-center`}>
          <UserButton />
          Profile
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="fixed top-5 left-5 z-50 p-2 bg-gray-50 shadow-lg rounded-lg md:hidden">
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
    </>
  )
}

export default SideNav;
