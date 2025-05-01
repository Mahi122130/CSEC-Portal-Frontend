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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<ApiMember | null>(null);

  // Static division data
  const divisions = [
    {
      _id: "1",
      name: "Development",
      members: [{ _id: "101", email: "dev1@example.com" }],
      coordinators: [],
      year_of_establishment: 2020,
      createdAt: "",
      updatedAt: "",
      __v: 0
    },
    {
      _id: "2",
      name: "Design",
      members: [{ _id: "102", email: "design1@example.com" }],
      coordinators: [],
      year_of_establishment: 2021,
      createdAt: "",
      updatedAt: "",
      __v: 0
    }
  ];

  const getMemberDivision = (memberId: string) => {
    const division = divisions.find(div => 
      div.members.some(m => m._id === memberId)
    );
    return division ? division.name : "No Division";
  };

  const getMemberDisplayData = (member: ApiMember) => {
    const name =
      member.personal_info?.first_name || member.personal_info?.last_name
        ? `${member.personal_info.first_name || ""} ${
            member.personal_info.last_name || ""
          }`.trim()
        : member.email.split("@")[0];

    const avatar = member.personal_info?.profile_picture;
    const id = member.personal_info?.university_id || member._id;

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

    // Static status and attendance for demo
    const status = "OnCampus";
    const attendance = "Active";

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

  const handleDeleteClick = (member: ApiMember, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    // Static delete action
    console.log("Member deleted:", memberToDelete);
    setDeleteDialogOpen(false);
  };

  if (!apiMembers || apiMembers.length === 0) {
    return <div className="p-4 text-gray-500">No members found</div>;
  }

  // Static member data
  const staticMembers = [
    {
      _id: "101",
      email: "john.doe@example.com",
      role: "member",
      personal_info: {
        first_name: "John",
        last_name: "Doe",
        profile_picture: "",
        university_id: "UG123",
        graduation_year: 2025
      },
      createdAt: "",
      updatedAt: ""
    },
    {
      _id: "102",
      email: "jane.smith@example.com",
      role: "member",
      personal_info: {
        first_name: "Jane",
        last_name: "Smith",
        profile_picture: "",
        university_id: "UG124",
        graduation_year: 2026
      },
      createdAt: "",
      updatedAt: ""
    }
  ];

  return (
    <>
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
            {staticMembers.map((member) => {
              const displayData = getMemberDisplayData(member);
              return (
                <TableRow
                  key={displayData.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    router.push(
                      `/dashboard/allmembers/profile?id=${member._id}`
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
                      {getMemberDivision(member._id)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-green-500 bg-green-50"
                    >
                      {displayData.attendance}
                    </Badge>
                  </TableCell>
                  <TableCell>{displayData.year}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-green-500 bg-green-50"
                    >
                      {displayData.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-transparent group"
                        onClick={(e) => handleDeleteClick(member, e)}
                      >
                        <Trash2 className="h-4 w-4 group-hover:text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {memberToDelete?.personal_info?.first_name 
                ? `${memberToDelete.personal_info.first_name} ${memberToDelete.personal_info.last_name || ''}` 
                : memberToDelete?.email}?
              <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="rounded-[10px] p-2"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="rounded-[10px] p-2"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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