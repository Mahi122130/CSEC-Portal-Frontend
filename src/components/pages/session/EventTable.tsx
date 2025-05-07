import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
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
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import api from "@/lib/axios"
import { format } from "date-fns"

export default function EventTable() {
  const [events, setEvents] = useState<any[]>([])
  const [divisions, setDivisions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('accessToken')
        if (!token) return

        // Fetch events
        const eventsResponse = await api.get('/event', {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
          withCredentials: false
        })

        // Fetch divisions
        const divisionsResponse = await api.get('/division', {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
          withCredentials: false
        })

        if (eventsResponse.data) {
          setEvents(eventsResponse.data)
        }
        if (divisionsResponse.data?.data) {
          setDivisions(divisionsResponse.data.data)
        }
      } catch (err) {
        console.error("Failed to fetch data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get division name by ID
  const getDivisionName = (divisionId: string) => {
    const division = divisions.find(d => d._id === divisionId)
    return division ? division.name : divisionId
  }

  // Pagination logic
  const totalPages = Math.ceil(events.length / itemsPerPage)
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMMM dd, yyyy")
  }

  if (loading) {
    return <div>Loading events...</div>
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Event Title</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEvents.map((event) => (
            <TableRow key={event._id}>
              <TableCell className="font-medium">{formatDate(event.date)}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{getDivisionName(event.division)}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    event.visibility === "public" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
                  } hover:bg-opacity-80 capitalize`}
                >
                  {event.visibility}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    event.status === "ended"
                      ? "bg-red-50 text-red-500"
                      : event.status === "planned"
                        ? "bg-yellow-50 text-yellow-500"
                        : "bg-green-50 text-green-500"
                  } hover:bg-opacity-80 capitalize`}
                >
                  {event.status}
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
            Showing {paginatedEvents.length} of {events.length} records
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