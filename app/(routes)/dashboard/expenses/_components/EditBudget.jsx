"use client"

import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { Budgets } from '@/utils/schema';

function EditBudget({budgetInfo,refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);

    useEffect(()=>{
        if(budgetInfo){
            setName(budgetInfo?.name)
            setAmount(budgetInfo?.amount)
            setEmojiIcon(budgetInfo?.icon)
        }
       
    
    },[budgetInfo])
  
    const { user } = useUser();

    const onEditBudget = async () => {
        const result = await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id)).returning(); 

        if(result){
            refreshData()
            toast('Budget Updated!')
        }
    }
  return (
    <div>
           <Dialog>
        <DialogTrigger asChild>
        <Button> <PenBox/> Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  variant="outline"
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setOpenEmojiPicker(false);
                      setEmojiIcon(e.emoji);
                    }}
                    open={openEmojiPicker}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    defaultValue={budgetInfo?.name}
                    className="text-black"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Car"
                  />
                </div>

                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    defaultValue={budgetInfo?.amount}
                    className="text-black"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. ₹50000"
                  />
                </div>

              
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChil   d>
          <Button
                 onClick={() => onEditBudget()}
                 disabled={!(name && amount)} 
                 className="mt-5 w-full">
                  Update Budget
                </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    
    </div>
  )
}

export default EditBudget
