"use client";

import { useState } from "react";
import AttendanceTable from "@/components/pages/attendance/AttendanceTable";
import { TableFilter } from "@/components/common/TableFilter";
import { TablePagination } from "@/components/common/TablePagination";

// Sample data
// Define the Member type
interface Member {
  id: string;
  name: string;
  avatar: string;
  attendance: string;
  year: string;
  status: string;
}

const sampleMembers: Member[] = [
  {
    id: "UGR/5800/14",
    name: "Kiya Kebe",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Active",
    year: "4th",
    status: "OnCampus",
  },
  {
    id: "UGR/5870/14",
    name: "Mohammed Sadik",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Active",
    year: "5th",
    status: "OffCampus",
  },
  {
    id: "UGR/5850/14",
    name: "Hussein Beshir",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Needs Attention",
    year: "3rd",
    status: "Withdrawn",
  },
  {
    id: "UGR/5340/14",
    name: "Estifanos Tesfaye",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Inactive",
    year: "4th",
    status: "Withdrawn",
  },
  {
    id: "UGR/2840/14",
    name: "Mahelet Yared",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Needs Attention",
    year: "5th",
    status: "Withdrawn",
  },
  {
    id: "UGR/1800/14",
    name: "Kiya Kebe",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Active",
    year: "4th",
    status: "OnCampus",
  },
  {
    id: "UGR/1870/14",
    name: "Mohammed Sadik",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Active",
    year: "5th",
    status: "OffCampus",
  },
  {
    id: "UGR/1850/14",
    name: "Hussein Beshir",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Needs Attention",
    year: "3rd",
    status: "Withdrawn",
  },
  {
    id: "UGR/1340/14",
    name: "Estifanos Tesfaye",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Inactive",
    year: "4th",
    status: "Withdrawn",
  },
  {
    id: "UGR/1840/14",
    name: "Mahelet Yared",
    avatar: "/placeholder.svg?height=40&width=40",
    attendance: "Needs Attention",
    year: "5th",
    status: "Withdrawn",
  },
];

export default function TableUsage() {
  const [currentPage, setCurrentPage] = useState(1);

  // handlers
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  const handleFilter = () => {
    console.log("Filter button clicked");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  return (
    <div className="flex flex-col h-full min-w-240 max-w-full mr-5 my-3 gap-4 rounded-[8px] border-1 border-gray-300">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 gap-3 flex flex-col p-2 m-3">
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col gap-6">
            {/* Filter */}
            <TableFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              placeholder="Search members..."
              saveButton={true}
            />
            <div>
              {/* Attendance Table */}
              <div className="grid grid-cols-3 gap-4 border-b py-3 text-sm font-medium justify-end text-gray-500">
                <div>Member Name</div>
                <div className="flex justify-end pr-10">Attendance</div>
                <div className="flex justify-end pr-15">Excused</div>
              </div>
              <AttendanceTable />

              {/* Pagination */}
              <TablePagination
                currentPage={currentPage}
                totalPages={5}
                totalItems={42}
                itemsPerPage={10}
                onPageChange={handlePageChange}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
