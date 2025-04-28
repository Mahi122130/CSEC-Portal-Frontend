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

// Sample data
const events = [
  {
    id: 1,
    date: "July 01, 2023",
    title: "Cyber Security Tutorial",
    type: "CPD",
    visibility: "Public",
    status: "Started",
  },
  {
    id: 2,
    date: "July 02, 2023",
    title: "Cyber Security Tutorial",
    type: "CPD",
    visibility: "Public",
    status: "Started",
  },
  { id: 3, date: "July 03, 2023", title: "Weekly session", type: "CPD", visibility: "Members", status: "Started" },
  {
    id: 4,
    date: "July 04, 2023",
    title: "Cyber Security Tutorial",
    type: "CPD",
    visibility: "Public",
    status: "Ended",
  },
  { id: 5, date: "July 05, 2023", title: "Contest", type: "CPD", visibility: "Public", status: "Ended" },
  { id: 6, date: "July 06, 2023", title: "Contest", type: "CPD", visibility: "Public", status: "Planned" },
  {
    id: 7,
    date: "July 07, 2023",
    title: "Cyber Security Tutorial",
    type: "CPD",
    visibility: "Public",
    status: "Started",
  },
  { id: 8, date: "July 08, 2023", title: "Contest", type: "Dev", visibility: "Public", status: "Ended" },
  { id: 9, date: "July 09, 2023", title: "Weekly session", type: "Dev", visibility: "Members", status: "Started" },
  {
    id: 10,
    date: "July 09, 2023",
    title: "Cyber Security Tutorial",
    type: "Dev",
    visibility: "Public",
    status: "Started",
  },
  { id: 11, date: "July 09, 2023", title: "Weekly session", type: "Dev", visibility: "Public", status: "Started" },
  { id: 12, date: "July 09, 2023", title: "Game Night", type: "Dev", visibility: "Public", status: "Started" },
  {
    id: 13,
    date: "July 09, 2023",
    title: "Cyber Security Tutorial",
    type: "Dev",
    visibility: "Public",
    status: "Started",
  },
]

export default function EventTable() {
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
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.date}</TableCell>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    event.visibility === "Public" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  } hover:bg-opacity-80`}
                >
                  {event.visibility}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    event.status === "Started"
                      ? "bg-green-100 text-green-800"
                      : event.status === "Ended"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  } hover:bg-opacity-80`}
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
          <Select defaultValue="10">
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">Showing 1 to 10 out of 50 records</span>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
