"use client";

import * as React from "react";
import { FaRegUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import DownArrow from "@/components/icons/images/DownArrow.png";
import Img from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropDownMenu() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex w-46 h-12 border-1 border-gray-300 rounded-[8px]">
          <div className="flex">
            <div className="flex w-auto items-center p-1">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col w-auto items-start justify-center p-1">
              <h1 className="font-bold">Henok Assefa</h1>
              <h3 className="text-gray-600">UI Designer</h3>
            </div>

            <div className="flex items-center p-1">
              <Img src={DownArrow} alt="down arrow" width={20} height={20} />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-45">
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="top">
            <div className="flex gap-2" onClick={() => router.push("/dashboard/profile")}>
              <FaRegUser />
              <div>My Profile</div>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">
            <div className="flex gap-2" onClick={() => router.push("/login")}>
              <ImExit color="red" />
              <div>Logout</div>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
