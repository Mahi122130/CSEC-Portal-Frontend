"use client";

import { MdAddCircleOutline } from "react-icons/md";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function AddDivisionDialog() {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState("");
  const [divisionName, setDivisionName] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    console.log({ divisionName, group });
    
    // Reset form and close dialog
    setGroup("");
    setDivisionName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex rounded-md bg-[#003087] text-white h-12 w-32 items-center justify-center cursor-pointer hover:bg-[#002f87a2]"
        >
          <div className="flex gap-1 items-center justify-center">
            <MdAddCircleOutline size={50} />
            <div>Add Division</div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] h-fit p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-3">
            Add New Division
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3 gap-3">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Division Name"
              className="flex w-80 h-11 px-3 py-6 border-1 border-gray-300 rounded-[8px]"
              value={divisionName}
              onChange={(e) => setDivisionName(e.target.value)}
            />
          </div>

          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="flex w-80 h-11 px-3 py-6 border-1 border-gray-300 rounded-[8px]">
              <SelectValue placeholder="Select Division Head" />
            </SelectTrigger>
            <SelectContent>
              {/* Add your options here */}
            </SelectContent>
          </Select>

          <div className="flex justify-center items-center gap-3">
            <div className="flex gap-3 items-center justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setOpen(false)}
                className="flex h-10 w-35 rounded-md items-center justify-center bg-[#34495E0D] cursor-pointer hover:bg-[#48637e0d]"
                aria-label="Cancel"
              >
                <h3 className="ml-1"> Cancel </h3>
              </Button>
            </div>

            <div className="flex gap-5 items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                className="flex h-10 w-35 rounded-md items-center justify-center bg-[#003087] cursor-pointer hover:bg-[#002f87a2]"
                aria-label="Invite"
                onClick={handleSubmit}
              >
                <h3 className="text-[#F8F8F8] ml-1">Add Division</h3>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}