"use client";
import React, { useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Budgets } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { toast } from "sonner";

const CreateBudget = ({refreshData}) => {
  const [emojiIcon, setEmojiIcon] = useState("🚗");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const { user } = useUser();
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast("New Budget Created!");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 border-2 p-10 flex flex-col items-center rounded-md border-dashed cursor-pointer hover:shadow-md ">
            <h2 className="text-3xl">+</h2>
            <h2 className="">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                    className="text-black"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Car"
                  />
                </div>

                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
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
          <DialogClose asChild>
          <Button
                 onClick={() => onCreateBudget()}
                 disabled={!(name && amount)} 
                 className="mt-5 w-full">
                  Create Budget
                </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
