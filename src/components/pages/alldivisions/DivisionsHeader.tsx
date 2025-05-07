"use client";

import { AddDivisionDialog } from "@/components/pages/alldivisions/AddDivisionDialog";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";

interface DivisionHeaderProps {
  onSearch: (value: string) => void;
  placeholder: string;
}

export default function DivisionHeader({ onSearch, placeholder }: DivisionHeaderProps) {
  return (
    <div className="flex items-center justify-between mx-4">
      <div className="flex justify-center gap-1 border-1 border-gray-300 rounded-[8px] h-12 items-center focus:outline-blue-600 focus:border-blue-600">
          <LuSearch size={45} className="p-3" />
          <div>
            <Input
              type="text"
              placeholder="Search"
              className="outline-none border-0 shadow-none focus:outline-0 focus:border-0 focus:shadow-none"
            />
          </div>
      </div>
      <AddDivisionDialog />
    </div>
  );
}