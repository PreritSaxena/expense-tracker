import { PiggyBank, ReceiptIndianRupee, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
 

function CardsInfo({budgetList}) {

    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)
    useEffect(()=>{
        budgetList&&calculateCardInfo()
    },[budgetList])

    const calculateCardInfo=()=>{
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        budgetList.forEach(element => {
            totalBudget_ = totalBudget_ + Number(element.amount)
            totalSpend_ = totalSpend_+  element.totalSpend
        })
        setTotalBudget(totalBudget_)
        setTotalSpend(totalSpend_)
        console.log(totalBudget_,totalSpend_)
    }

  return (
    <div>
   { budgetList?.length>0 ? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  '>
     <div className='p-7 border rounded-lg shadow-md flex items-center justify-between'>
        <div>
            <h2 className='text-sm'>Total Budget</h2>
            <h2 className='font-bold text-2xl'>₹{totalBudget}</h2>
        </div>
        <PiggyBank className='bg-primary text-white rounded-full h-12 w-12 p-3'/>
      </div>

      <div className='p-7 border rounded-lg shadow-md flex items-center justify-between'>
        <div>
            <h2 className='text-sm'>Total Spend</h2>
            <h2 className='font-bold text-2xl'>₹{totalSpend}</h2>
        </div>
        <ReceiptIndianRupee className='bg-primary text-white rounded-full h-12 w-12 p-3'/>
      </div>

      <div className='p-7 border rounded-lg shadow-md flex items-center justify-between'>
        <div>
            <h2 className='text-sm'>Number of Budget</h2>
            <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
        </div>
        <Wallet className='bg-primary text-white rounded-full h-12 w-12 p-3'/>
      </div>  
      
    </div>
    :
    <div className='p-7 border rounded-lg  flex items-center justify-between gap-5'>
        {[1,2,3].map((items,index) => (
            <div className='h-[110px] animate-pulse bg-slate-200 w-full rounded-lg'>  </div>
        ))}
    </div>
    }
    </div>
  )
}

export default CardsInfo
