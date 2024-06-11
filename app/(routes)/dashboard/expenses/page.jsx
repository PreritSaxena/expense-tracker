"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

import ExpenseListTable from './_components/ExpenseListTable'
 
  

function ExpensesPage() {
    const [budgetList , setBudgetList] = useState([])
  const [expensesList , setExpensesList] = useState([])
  const {user} = useUser();
  useEffect(()=>{
     
    getBudgetList();
  },[user])

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItems:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    setBudgetList(result);
    getAllExpense();
    // console.log(result)
  }

  const getAllExpense=async()=>{
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.id))
    setExpensesList(result);
    
    
  }
  return (
    <div className='p-5'>
        <h1 className='font-bold text-xl'>All Expenses</h1>
      <ExpenseListTable
          className='mt-3'
          expenseList={expensesList}
          refreshData={()=>getBudgetList()}
          />
    </div>
  )
}
 


export default ExpensesPage
