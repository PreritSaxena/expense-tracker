"use client"
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CardsInfo from './_components/CardsInfo'
import BarChartDashboard from './_components/BarChartDashboard' 
import BudgetItems from './budgets/_components/BudgetItems'
import ExpenseListTable from './expenses/_components/ExpenseListTable'

function Dashboard() {

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
    <div className='p-7'>
        <h1 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️  </h1>
        <p className='  text-gray-600'>Here's what happenning with your money, Lets Manage your expense</p>

        <CardsInfo budgetList={budgetList}/>  
        <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-5'>
          <div className='md:col-span-2'>
            <BarChartDashboard budgetList={budgetList}/>

            <h1 className='font-bold text-lg p-5'>Latest Expenses</h1>
            <ExpenseListTable
          expenseList={expensesList}
          refreshData={()=>getBudgetList()}
          />
          </div>

         
          <div className='grid gap-5'> 
            <h2 className='font-bold text-lg'>Latest Budget</h2>
            {budgetList.map((budget,index) =>(
              <BudgetItems budget={budget} key={index}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Dashboard
