"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface AddSessionFormProps {
  onCancel: () => void
}

export default function AddSessionForm({ onCancel }: AddSessionFormProps) {
  const [date, setDate] = useState<Date>()
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className="bg-white p-6 rounded-lg border max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Add New Session</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="session-title">Session Title</Label>
            <Input id="session-title" placeholder="Enter session title" />
          </div>

          <div>
            <Label htmlFor="session-group">Session Group</Label>
            <Select>
              <SelectTrigger id="session-group">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group1">Group 1</SelectItem>
                <SelectItem value="group2">Group 2</SelectItem>
                <SelectItem value="group3">Group 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="select-day">Select Day</Label>
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setShowCalendar(true)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select day"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date)
                    setShowCalendar(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="session-division">Session Division</Label>
            <Select>
              <SelectTrigger id="session-division">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Dev</SelectItem>
                <SelectItem value="cpd">CPD</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-month">Start Month</Label>
              <Input id="start-month" placeholder="Start Month" />
            </div>
            <div>
              <Label htmlFor="end-month">End Month</Label>
              <Input id="end-month" placeholder="End Month" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input id="start-time" type="time" />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input id="end-time" type="time" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-[#003081] rounded-[8px] text-white hover:bg-[#002060]">Create</Button>
      </div>
    </div>
  )
}
