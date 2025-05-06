"use client";

import { useState } from "react";
import { TableFilter } from "@/components/common/TableFilter";
import { TablePagination } from "@/components/common/TablePagination";
import { MembersTable } from "@/components/pages/alldivisions/groups/members/GroupMembersTable";

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
        <div className="flex-1 gap-3 flex flex-col p-2">
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col gap-6">
            {/* Filter */}
            <TableFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              placeholder="Search members..."
              addMembersButton={true}
              importButton={false}
            />
            <div>
              {/* Table */}
              <MembersTable apiMembers={[]} />
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
