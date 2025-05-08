"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";

interface Member {
  id: string;
  name: string;
  speciality: string;
  imgUrl?: string;
}

interface Group {
  id: string;
  name: string;
  totalMembers: number;
  members: Member[];
}

interface GroupCardProps {
  group: Group;
  className?: string;
  linkText?: string; 
}

export default function GroupCard({ group, linkText = "View All" }: GroupCardProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (memberId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  return (
    <Card className="border-1 border-gray-300 rounded-[8px] p-3 dark:bg-gray-800 dark:border-gray-700 w-[49%] mb-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-medium">{group.name}</CardTitle>
        <Link 
          href={`/dashboard/alldivisions/groups/members?groupId=${group.id}`}
          passHref
        >
          <Button
            variant="link"
            className="text-sm font-medium text-[#003087] cursor-pointer"
          >
            {linkText} 
          </Button>
        </Link>
      </CardHeader>
      <div className="text-sm text-muted-foreground">
        {group.totalMembers} Members
      </div>
      <div className="flex justify-center border-b mt-1"></div>
      <CardContent className="p-0">
        <div className="space-y-1">
          {group.members.map((member) => (
            <Collapsible
              key={member.id}
              open={openGroups[member.id]}
              onOpenChange={() => toggleGroup(member.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full justify-between p-2 font-normal"
                >
                  <Link 
                    href={`/dashboard/allmembers/profile?id=${member.id}`}
                    passHref
                    className="flex justify-between w-full items-center"
                  >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <Avatar className="flex items-center">
                        <AvatarImage src={member.imgUrl} className="rounded-full"/>
                        <AvatarFallback className="rounded-full">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span>{member.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {member.speciality}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 cursor-pointer" />
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