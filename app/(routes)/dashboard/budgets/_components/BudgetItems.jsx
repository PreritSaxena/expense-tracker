import { CloudFog } from "lucide-react";
import Link from "next/link";
import React from "react";

const BudgetItems = ({ budget }) => {

  const calcuTotalPercentage = () => {
    const perc = (budget?.totalSpend / budget?.amount) * 100; 
    if(perc > 100) return;
    return perc.toFixed(2);
  }

  return (
    
  
    <Link href={'/dashboard/expenses/'+budget?.id}  >
      
      <div className="p-5 border-2 rounded-lg hover:shadow-md cursor-pointer h-[170px] ">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl px-4 p-3 rounded-full bg-slate-100">
            {budget?.icon}
          </h2>

          <div>
            <h2 className="font-bold">{budget?.name}</h2>
            <h2 className="text-sm text-gray-600">{budget?.totalItems} Item</h2>
          </div>
        </div>
        <h2 className="text-primary font-bold text-lg">₹{budget?.amount}</h2>
        
      </div>

      <div className="mt-5 ">
        <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400 ">₹{budget?.totalSpend ? budget?.totalSpend : 0 } Spend</h2>
            <h2 className="text-xs text-slate-400 ">₹{budget?.amount - budget?.totalSpend } Remaining</h2>
        </div>
      <div className="w-full bg-slate-300 h-2 rounded-full">    
            <div className=" h-2 rounded-full bg-primary"
            
             style={{width: `${calcuTotalPercentage()}%`}}>

            </div>
      </div>
      </div>
      </div>
    </Link>
  );
};

export default BudgetItems;
