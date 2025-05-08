"use client";

import GroupOverview from "@/components/pages/alldivisions/groups/GroupOverview";
import { GroupsHeader } from "@/components/pages/alldivisions/groups/GroupsHeader";

export default function TableUsage() {
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  return (
    <div className="flex flex-col max-w-full mr-5 my-3 p-4 gap-4 rounded-[8px] border-1 border-gray-300">
      <div className="flex">
        {/* Main Content */}
        <div className="gap-3 flex flex-col w-full">
          {/* Main Content Area */}
          <main className="flex flex-col gap-4 w-full">
            <GroupsHeader />
            <GroupOverview />
          </main>
        </div>
      </div>
    </div>
  );
}
