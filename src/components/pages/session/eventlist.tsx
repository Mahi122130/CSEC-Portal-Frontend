import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Sample data
const events = [
  {
    id: 1,
    title: "Tutorial",
    description: "Cyber Security Tutorial",
    type: "members",
    timeLeft: "1d 13h 31m left",
    venue: "Lab 1",
  },
  {
    id: 2,
    title: "Game Night",
    description: "Funny Games Beyond Coding",
    type: "members",
    timeLeft: "1d 13h 21m left",
    venue: "Lab 1",
  },
  {
    id: 3,
    title: "Seminar",
    description: "Working Remotely",
    type: "public",
    timeLeft: "1d 13h 3m ago",
    venue: "Lab 1",
  },
  {
    id: 4,
    title: "Dev Division",
    description: "Development weekly session",
    type: "members",
    timeLeft: "1d 13h 31m left",
    venue: "Lab 1",
  },
]

export default function EventList() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="border-t-0 border-r-0 border-b border-l-0 rounded-none shadow-none">
          <CardContent className="p-0">
            <div className="flex justify-between items-start py-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      event.title === "Seminar"
                        ? "bg-red-500"
                        : event.title === "Game Night"
                          ? "bg-yellow-500"
                          : event.title === "Dev Division"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                    }`}
                  ></div>
                  <h3 className="text-lg font-medium">{event.title}</h3>
                </div>
                <p className="text-sm text-gray-500">{event.description}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="rounded-full text-xs">
                    {event.type === "members" ? "Members" : "Public"}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{event.timeLeft}</p>
                <p className="text-xs text-gray-500 mt-1">Venue: {event.venue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
