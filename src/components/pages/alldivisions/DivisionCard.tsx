"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

interface Group {
  id: string;
  name: string;
  members: number;
}

interface Division {
  id: string;
  name: string;
  totalMembers: number;
  groups: Group[];
}

interface DivisionCardProps {
  division: Division;
  className?: string;
}

export default function DivisionCard({ division }: DivisionCardProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <Card className="border-1 border-gray-300 rounded-[8px] p-3 dark:bg-gray-800 dark:border-gray-700 min-w-124 ml-1 mb-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-medium">{division.name}</CardTitle>
        <Link href="/dashboard/alldivisions/groups">
          <Button
            variant="link"
            className="text-sm font-medium text-[#003087] cursor-pointer"
          >
            View All
          </Button>
        </Link>
      </CardHeader>
      <div className="text-sm text-muted-foreground">
        {division.totalMembers} Groups
      </div>
      <div className="flex justify-center border-b w-118 mt-1"></div>
      <CardContent className="p-0">
        <div className="space-y-1">
          {division.groups.map((group) => (
            <Collapsible
              key={group.id}
              open={openGroups[group.id]}
              onOpenChange={() => toggleGroup(group.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-between p-2 font-normal"
                >
                  <div className="flex flex-col items-start">
                    <span>{group.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {group.members} Members
                    </span>
                  </div>
                  <Link href="/dashboard/alldivisions/groups">
                    <ChevronRight
                      className="h-4 w-4 cursor-pointer"
                    />
                  </Link>
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}