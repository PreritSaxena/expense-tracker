import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { ArrowBigLeft, ArrowLeft, Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
 

function AddExpense({budgetId , user , refreshData}) {

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading , setLoading] = useState(false)

  const addNewExpense = async () => {
    setLoading(true)
    const result = await db.insert(Expenses).values({
        name:name,
        amount:amount,
        budgetId:budgetId,
        createdAt:moment().format('DD/MM/YYYY'),
    }).returning({insertedId:Budgets.id});


    setAmount('')
    setName('')
    if(result){
      setLoading(false)
        refreshData()
        toast('New Expense added')
    }
    setLoading(false)
  }
  return (
    <div className="border shadow-lg rounded-lg p-4">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
    
        <h2 className="text-black font-bold my-1">Expense Name</h2>
        <Input
         value={name}
          placeholder="e.g Home Decor"
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div>
        <h2 className="text-black font-bold my-1">Expense Amount</h2>
        <Input
          value={amount}
          type="number"
          placeholder="e.g ₹5000"
          onChange={(e) => setAmount(e.target.value)}
        />
        </div>

        <Button disabled={!(name&&amount)} className="mt-2 w-full"
        onClick = {() => addNewExpense()}
        >
          {loading ? <Loader className="animate-spin"/> : "Add New Expense" }</Button>
      </div>
    
  );
}

export default AddExpense;
