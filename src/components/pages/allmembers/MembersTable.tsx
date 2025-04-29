"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApiMember {
  _id: string;
  email: string;
  role: string;
  personal_info?: {
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    university_id?: string;
    graduation_year?: number;
    resources?: any[];
  };
  createdAt: string;
  updatedAt: string;
}

interface MembersTableProps {
  apiMembers: ApiMember[];
  className?: string;
}

export function MembersTable({ apiMembers, className }: MembersTableProps) {
  const router = useRouter();

  const getMemberDisplayData = (member: ApiMember) => {
    // Get name from personal_info or use email prefix
    const name =
      member.personal_info?.first_name || member.personal_info?.last_name
        ? `${member.personal_info.first_name || ""} ${
            member.personal_info.last_name || ""
          }`.trim()
        : member.email.split("@")[0];

    // Get avatar from personal_info or use default
    const avatar = member.personal_info?.profile_picture;

    // Get ID from personal_info or use _id
    const id = member.personal_info?.university_id || member._id;

    // Calculate year based on graduation year if available
    let year = "N/A";
    if (member.personal_info?.graduation_year) {
      const currentYear = new Date().getFullYear();
      const diff = member.personal_info.graduation_year - currentYear;
      if (diff === 0) year = "5th";
      else if (diff === 1) year = "4th";
      else if (diff === 2) year = "3rd";
      else if (diff === 3) year = "2nd";
      else if (diff === 4) year = "1st";
    }

    // Determine activity status based on last update
    const lastUpdated = new Date(member.updatedAt);
    const currentDate = new Date();
    const monthsSinceUpdate =
      (currentDate.getFullYear() - lastUpdated.getFullYear()) * 12 +
      (currentDate.getMonth() - lastUpdated.getMonth());

    const status = monthsSinceUpdate < 6 ? "OnCampus" : "OffCampus";
    const attendance =
      monthsSinceUpdate < 3
        ? "Active"
        : monthsSinceUpdate < 6
        ? "Needs Attention"
        : "Inactive";

    return {
      id,
      name,
      avatar,
      email: member.email,
      role: member.role,
      year,
      status,
      attendance,
    };
  };

  const handleEdit = (memberId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Edit member:", memberId);
  };

  const handleDelete = (memberId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Delete member:", memberId);
  };

  if (!apiMembers || apiMembers.length === 0) {
    return <div className="p-4 text-gray-500">No members found</div>;
  }

  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500">Member Name</TableHead>
            <TableHead className="text-gray-500">Member ID</TableHead>
            <TableHead className="text-gray-500">Division</TableHead>
            <TableHead className="text-gray-500">Attendance</TableHead>
            <TableHead className="text-gray-500">Year</TableHead>
            <TableHead className="text-gray-500">Status</TableHead>
            <TableHead className="text-gray-500 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiMembers.map((member) => {
            const displayData = getMemberDisplayData(member);
            return (
              <TableRow
                key={displayData.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  router.push(
                    `/dashboard/allmembers/profile?id=${displayData.id}`
                  )
                }
              >
                <TableCell>
                  <div className="flex items-center gap-3 p-1">
                    <Avatar>
                      <AvatarImage
                        src={displayData.avatar}
                        alt={displayData.name}
                      />
                      <AvatarFallback>
                        {getInitials(displayData.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{displayData.name}</div>
                  </div>
                </TableCell>
                <TableCell>{displayData.id}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {displayData.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      displayData.attendance === "Active"
                        ? "text-green-500 bg-green-50"
                        : "",
                      displayData.attendance === "Inactive"
                        ? "text-red-500 bg-red-50"
                        : "",
                      displayData.attendance === "Needs Attention"
                        ? "text-amber-500 bg-amber-50"
                        : ""
                    )}
                  >
                    {displayData.attendance}
                  </Badge>
                </TableCell>
                <TableCell>{displayData.year}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      displayData.status === "OnCampus"
                        ? "outline"
                        : "secondary"
                    }
                    className={cn(
                      displayData.status === "OnCampus"
                        ? "text-green-500 bg-green-50"
                        : "",
                      displayData.status === "OffCampus"
                        ? "text-red-500 bg-red-50"
                        : ""
                    )}
                  >
                    {displayData.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleEdit(displayData.id, e)}
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleDelete(displayData.id, e)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
