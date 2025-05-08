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
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

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
    specialization?: string;
    department?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Division {
  _id: string;
  name: string;
  members: string[];
  coordinators: any[];
  year_of_establishment: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MembersTableProps {
  apiMembers: ApiMember[];
  className?: string;
  onDeleteSuccess?: () => void;
}

export function MembersTable({ apiMembers, className, onDeleteSuccess }: MembersTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<ApiMember | null>(null);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loadingDivisions, setLoadingDivisions] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const token = Cookies.get('accessToken');
        if (!token) return;

        const response = await api.get('/division', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (response.data && Array.isArray(response.data.data)) {
          setDivisions(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch divisions:", error);
      } finally {
        setLoadingDivisions(false);
      }
    };

    fetchDivisions();
  }, []);

  const getMemberDivision = (memberId: string) => {
    if (loadingDivisions) return "Loading...";
    
    const division = divisions.find(div => 
      div.members.includes(memberId)
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

    const status = "OnCampus";
    const attendance = "Active";
    const specialization = member.personal_info?.specialization || "Not specified";

    return {
      id,
      name,
      avatar,
      email: member.email,
      role: member.role,
      year,
      status,
      attendance,
      specialization
    };
  };

  const handleDeleteClick = (member: ApiMember, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = Cookies.get('accessToken');
      if (!token) throw new Error('Authentication required');

      await api.delete(`/user/${memberToDelete._id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error("Failed to delete member:", error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (!apiMembers || apiMembers.length === 0) {
    return <div className="p-4 text-gray-500">No members found in this group</div>;
  }

  return (
    <>
      <div className={cn("rounded-lg border overflow-hidden", className)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500">Member Name</TableHead>
              <TableHead className="text-gray-500">Member ID</TableHead>
              <TableHead className="text-gray-500">Division</TableHead>
              <TableHead className="text-gray-500">Specialization</TableHead>
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
                  key={member._id}
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
                    <Badge variant="outline">
                      {displayData.specialization}
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
              disabled={isDeleting}
              className="rounded-[10px] p-2"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={isDeleting}
              className="rounded-[10px] p-2"
            >
              {isDeleting ? "Deleting..." : "Delete"}
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