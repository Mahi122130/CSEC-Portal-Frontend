"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import Cookies from "js-cookie";
import api from "@/lib/axios";

interface SessionTableProps {
  sessions: any[];
  onDeleteSuccess?: () => void;
}

export default function SessionTable({
  sessions,
  onDeleteSuccess,
}: SessionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const currentUserRole = Cookies.get("role");

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await api.get("/division", {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          withCredentials: false,
        });

        setDivisions(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch divisions:", err);
        setError("Failed to load divisions");
        setLoading(false);
      }
    };
    fetchDivisions();
  }, [onDeleteSuccess]);

  // Pagination logic
  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const paginatedSessions = sessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ended":
        return "bg-red-50 text-red-500";
      case "planned":
        return "bg-yellow-50 text-yellow-500";
      default:
        return "bg-green-50 text-green-500";
    }
  };

  const getDivisionName = (divisionId: string) => {
    if (loading) return "Loading...";
    if (error) return "Error loading";
    const division = divisions.find((d) => d._id === divisionId);
    return division ? division.name : divisionId;
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        setToast({ message: "Authentication required", type: "error" });
        return;
      }

      await api.delete(`/session/${itemToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      setToast({ message: "Session deleted successfully", type: "success" });
      setShowConfirm(false);
      setItemToDelete(null);
      if (onDeleteSuccess) {
        setTimeout(() => {
          onDeleteSuccess();
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to delete session:", err);
      setToast({ message: "Failed to delete session", type: "error" });
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toast.message}
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this session? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirm(false);
                  setItemToDelete(null);
                }}
                className="p-2 rounded-[10px]"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="p-2 rounded-[10px]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Session Title</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Total groups</TableHead>
              <TableHead>Status</TableHead>
              {currentUserRole !== "member" && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSessions.map((session) => (
              <TableRow key={session._id}>
                <TableCell className="font-medium">
                  {formatDate(session.date)}
                </TableCell>
                <TableCell>{session.title}</TableCell>
                <TableCell>{getDivisionName(session.division)}</TableCell>
                <TableCell>{session.groups.length}</TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusBadge(
                      session.status
                    )} hover:bg-opacity-80 capitalize`}
                  >
                    {session.status}
                  </Badge>
                </TableCell>
                {currentUserRole !== "member" && (
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => {
                          setItemToDelete(session._id);
                          setShowConfirm(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Showing</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">
              Showing {paginatedSessions.length} of {sessions.length} records
            </span>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      className="rounded-[8px]"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
