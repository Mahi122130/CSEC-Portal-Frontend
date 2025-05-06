"use client"

import { useState } from "react"
import { List, Table2 } from "lucide-react"
import { MdAddCircleOutline } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EventList from "@/components/pages/session/eventlist"
import EventTable from "@/components/pages/session/EventTable"
import SessionList from "@/components/pages/session/session-list"
import SessionTable from "@/components/pages/session/sessiontable"
import AddEventForm from "@/components/pages/session/add-event-dialog"
import AddSessionForm from "@/components/pages/session/add-session-dialog"

export default function SessionAndEvent() {
  const [view, setView] = useState<"list" | "table">("list")
  const [type, setType] = useState<"event" | "session">("event")
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="container mx-auto max-w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button
            variant={view === "list" ? "none" : "none"}
            className={`h-10 px-4 rounded-[8px] ${view === "list" ? "bg-[#003081] text-white" : "cursor-pointer"}`}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={view === "table" ? "none" : "none"}
            className={`h-10 px-4 rounded-[8px] ${view === "table" ? "bg-[#003081] text-white" : "cursor-pointer"}`}
            onClick={() => setView("table")}
          >
            <Table2 className="h-4 w-4 mr-2" />
            Table
          </Button>
        </div>
        <div className="flex justify-center space-x-2">
          <Button className="bg-[#003081] text-white rounded-[8px] hover:bg-[#002f8775] cursor-pointer h-10 px-2" onClick={() => setShowAddForm(true)}>
            <MdAddCircleOutline className="h-4 w-4" />
            Create {type === "event" ? "Event" : "Session"}
          </Button>
          <Select
            value={type}
            onValueChange={(value) => {
              setType(value as "event" | "session")
              setShowAddForm(false)
            }}
          >
            <SelectTrigger className="w-[130px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="session">Session</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showAddForm ? (
        type === "event" ? (
          <AddEventForm onCancel={() => setShowAddForm(false)} />
        ) : (
          <AddSessionForm onCancel={() => setShowAddForm(false)} />
        )
      ) : (
        <>
          {type === "event" ? (
            view === "list" ? (
              <EventList />
            ) : (
              <EventTable />
            )
          ) : view === "list" ? (
            <SessionList />
          ) : (
            <SessionTable />
          )}
        </>
      )}
    </div>
  )
}