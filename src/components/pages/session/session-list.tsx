import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Sample data
const sessions = [
  {
    id: 1,
    title: "Dev Division",
    description: "Development weekly session",
    status: "Planned",
    timeLeft: "1d 13h 31m left",
    venue: "Lab 1",
    groups: ["Group 1", "Group 2", "Group 3"],
  },
  {
    id: 2,
    title: "Dev Division",
    description: "Development weekly session",
    status: "Planned",
    timeLeft: "1d 13h 31m left",
    venue: "Lab 1",
    groups: ["Group 1", "Group 2", "Group 3"],
  },
  {
    id: 3,
    title: "Dev Division",
    description: "Development weekly session",
    status: "Ended",
    timeLeft: "1d 12h 5m ago",
    venue: "Lab 1",
    groups: ["Group 1", "Group 2", "Group 3"],
  },
  {
    id: 4,
    title: "Dev Division",
    description: "Development weekly session",
    status: "Planned",
    timeLeft: "1d 13h 31m left",
    venue: "Lab 1",
    groups: ["Group 1", "Group 2", "Group 3"],
  },
]

export default function SessionList() {
  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="border-t-0 border-r-0 border-b border-l-0 rounded-none shadow-none">
          <CardContent className="p-0">
            <div className="flex justify-between items-start py-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      session.status === "Ended"
                        ? "bg-red-500"
                        : session.status === "Planned"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  <h3 className="text-lg font-medium">{session.title}</h3>
                </div>
                <p className="text-sm text-gray-500">{session.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {session.groups.map((group, index) => (
                    <Badge key={index} variant="outline" className="rounded-full text-xs">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{session.timeLeft}</p>
                <p className="text-xs text-gray-500 mt-1">Venue: {session.venue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
