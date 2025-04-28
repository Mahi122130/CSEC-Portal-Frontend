import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SessionTableProps {
  sessions: {
    id: string
    date: string
    title: string
    type: string
    visibility: "Public" | "Private"
    status: "Draft" | "Published"
  }[]
}

function Pagination() {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-xs text-gray-500">Showing 1 to 12 of 42 results</div>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 bg-blue-50 text-blue-600 border-blue-200">
          1
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          2
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          3
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          4
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8">
          5
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function SessionTableView({ sessions }: SessionTableProps) {
  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr className="border-b">
              <th className="text-left p-3 font-medium text-sm">Date</th>
              <th className="text-left p-3 font-medium text-sm">Event Title</th>
              <th className="text-left p-3 font-medium text-sm">Event Type</th>
              <th className="text-left p-3 font-medium text-sm">Visibility</th>
              <th className="text-left p-3 font-medium text-sm">Status</th>
              <th className="text-left p-3 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-b">
                <td className="p-3 text-sm">{session.date}</td>
                <td className="p-3 text-sm">{session.title}</td>
                <td className="p-3 text-sm">{session.type}</td>
                <td className="p-3">
                  <Badge
                    variant="outline"
                    className={
                      session.visibility === "Public"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-orange-50 text-orange-600 border-orange-200"
                    }
                  >
                    {session.visibility}
                  </Badge>
                </td>
                <td className="p-3">
                  <Badge
                    variant="outline"
                    className={
                      session.status === "Published"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }
                  >
                    {session.status}
                  </Badge>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  )
}