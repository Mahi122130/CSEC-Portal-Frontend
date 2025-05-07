"use client";
import DivisionsOverview from "@/components/pages/alldivisions/DivisionsOverview";
import DivisionsHeader from "@/components/pages/alldivisions/DivisionsHeader";
export default function DivisionsPage() {
  return (
    <div className="flex flex-col min-w-240 max-w-full mr-5 my-3 py-4 gap-4 rounded-[8px] border-1 border-gray-300">
      <div className="flex">
        <div className="gap-3 flex flex-col p-2 w-full">
          <DivisionsHeader onSearch={function (value: string): void {
            throw new Error("Function not implemented.");
          } } placeholder={""} />
          <DivisionsOverview />
        </div>
      </div>
    </div>
  );
}