"use client";

import Image from "next/image";
import ShakeHand from "@/components/icons/images/ShakeHand.png";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import DropDownMenu from "./DropDownMenu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"; 

interface NavbarProps {
  name?: string;
  time?: string;
}

export default function Navbar({ name, time }: NavbarProps) {
  const [fname, setFname] = useState("Guest");
  const pathname = usePathname();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        const firstName = user?.personal_info?.first_name || "Guest"; 
        setFname(firstName);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const getTimeOfDay = () => {
    if (time) return time;
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const getGreeting = () => {
    if (pathname === '/dashboard/allmembers') {
      return (
        <>
          <h1 className="text-lg font-semibold">All Members</h1>
          <h3 className="text-sm text-gray-600">All Members Information</h3>
        </>
      );
    } else if (pathname === '/dashboard/alldivisions') {
      return (
        <>
          <h1 className="text-lg font-semibold">All Divisions</h1>
          <h3 className="text-sm text-gray-600">All Divisions Information</h3>
        </>
      );
    } else {
      return (
        <>
          <div className="flex gap-1">
            <h1 className="text-lg font-semibold">Hello {fname}</h1> 
            <Image
              src={ShakeHand}
              alt="Handshake icon"
              width={25}
              height={25}
            />
          </div>
          <h3 className="text-sm text-gray-600">Good {getTimeOfDay()}</h3>
        </>
      );
    }
  };

  return (
    <div className="flex h-20 w-full mr-3 justify-between items-center p-2">
      <div className="pl-1">
        <div className="flex gap-3">
          <div>
            {getGreeting()}
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-auto justify-center items-center">
        <div className="flex justify-center gap-1 border-1 border-gray-300 rounded-[8px] h-12 items-center focus:outline-blue-600 focus:border-blue-600">
          <LuSearch size={45} className="p-3" />
          <div>
            <Input type="text" placeholder="Search" className="outline-none border-0 shadow-none focus:outline-0 focus:border-0 focus:shadow-none" />
          </div>
        </div>

        <div className="flex w-12 h-12 bg-[#34495E1A] border-1 border-gray-300 rounded-[8px] justify-center items-center">
          <GoBell size={20} />
        </div>

        <div>
          <DropDownMenu />
        </div>
      </div>
    </div>
  );
}
