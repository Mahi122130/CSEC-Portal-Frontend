"use client";

import { useState, useEffect } from "react";
import { TableFilter } from "@/components/common/TableFilter";
import { TablePagination } from "@/components/common/TablePagination";
import { MembersTable } from "@/components/pages/alldivisions/groups/members/GroupMembersTable";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

export default function TableUsage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [canAddMembers, setCanAddMembers] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  useEffect(() => {
    const role = Cookies.get("role");
    setCanAddMembers(!!role && role !== "member");
  }, []);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = Cookies.get('accessToken');
        if (!token) {
          throw new Error("Authentication required");
        }

        if (!groupId) {
          throw new Error("No group ID provided");
        }

        // First get the group details
        const groupResponse = await api.get(`/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        });

        const groupData = groupResponse.data;
        
        // Then fetch member details for each member in the group
        const memberDetails = await Promise.all(
          groupData.members.map((memberId: string) => 
            api.get(`/user/${memberId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
              }
            }).then(res => res.data.user) // Changed from res.data.user to res.data
          )
        );

        setMembers(memberDetails);
      } catch (err) {
        setError('Failed to load group members. Some information may be incomplete.');
        console.error("Fetch error:", err);
        
        if (err instanceof Error && (err.message === "Authentication required" || 
            (err as any).response?.status === 401)) {
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (groupId) {
      fetchGroupMembers();
    }
  }, [groupId, refreshKey]);

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

  const handleMemberAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) return <div className="p-4">Loading members...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col h-full min-w-240 max-w-full mr-5 my-3 gap-4 rounded-[8px] border-1 border-gray-300">
      <div className="flex">
        <div className="flex-1 gap-3 flex flex-col p-2">
          <main className="flex-1 flex flex-col gap-6">
            <TableFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              placeholder="Search members..."
              addMembersButton={canAddMembers}
              onMemberAdded={handleMemberAdded}
            />
            <div>
              <MembersTable 
                apiMembers={members} 
                onDeleteSuccess={handleDeleteSuccess}
              />
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