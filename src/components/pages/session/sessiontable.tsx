'use client'

import { useState, useEffect } from "react"
import { Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import Cookies from "js-cookie"
import api from "@/lib/axios"

export default function SessionTable({ sessions }: { sessions: any[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [divisions, setDivisions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const token = Cookies.get('accessToken')
        if (!token) {
          setError('No authentication token found')
          setLoading(false)
          return
        }

        const response = await api.get('/division', {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
          withCredentials: false
        })

        setDivisions(response.data.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch divisions:', err)
        setError('Failed to load divisions')
        setLoading(false)
      }
    }
    fetchDivisions()
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(sessions.length / itemsPerPage)
  const paginatedSessions = sessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMMM dd, yyyy")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ended":
        return "bg-red-50 text-red-500"
      case "planned":
        return "bg-yellow-50 text-yellow-500"
      default:
        return "bg-green-50 text-green-500"
    }
  }

  const getDivisionName = (divisionId: string) => {
    if (loading) return "Loading..."
    if (error) return "Error loading"
    const division = divisions.find(d => d._id === divisionId)
    return division ? division.name : divisionId
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Session Title</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>Total groups</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedSessions.map((session) => (
            <TableRow key={session._id}>
              <TableCell className="font-medium">{formatDate(session.date)}</TableCell>
              <TableCell>{session.title}</TableCell>
              <TableCell>{getDivisionName(session.division)}</TableCell>
              <TableCell>{session.groups.length}</TableCell>
              <TableCell>
                <Badge
                  className={`${getStatusBadge(session.status)} hover:bg-opacity-80 capitalize`}
                >
                  {session.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
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
              setItemsPerPage(Number(value))
              setCurrentPage(1)
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
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}
                  className="rounded-[8px]"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}