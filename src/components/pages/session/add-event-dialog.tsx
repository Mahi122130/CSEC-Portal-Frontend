"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface AddEventFormProps {
  onCancel: () => void
}

export default function AddEventForm({ onCancel }: AddEventFormProps) {
  const [visibility, setVisibility] = useState<"public" | "members">("public")
  const [date, setDate] = useState<Date>()
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [attendance, setAttendance] = useState<"mandatory" | "optional">("mandatory")

  const handleAddGroup = () => {
    if (selectedGroups.length < 3) {
      const newGroup = `Group ${selectedGroups.length + 1}`
      setSelectedGroups([...selectedGroups, newGroup])
    }
  }

  const handleRemoveGroup = (group: string) => {
    setSelectedGroups(selectedGroups.filter((g) => g !== group))
  }

  return (
    <div className="bg-white p-6 rounded-lg border max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Add New Event</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="event-title">Event Title</Label>
            <Input id="event-title" placeholder="Enter event title" />
          </div>

          {visibility === "members" && (
            <>
              <div>
                <Label htmlFor="select-division">Select Division</Label>
                <Select>
                  <SelectTrigger id="select-division">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Dev</SelectItem>
                    <SelectItem value="cpd">CPD</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="select-group">Select Group</Label>
                <div className="flex items-center gap-2">
                  <Select onValueChange={handleAddGroup}>
                    <SelectTrigger id="select-group" className="flex-1">
                      <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group1">Group 1</SelectItem>
                      <SelectItem value="group2">Group 2</SelectItem>
                      <SelectItem value="group3">Group 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedGroups.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedGroups.map((group, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {group}{" "}
                      <span className="ml-2 cursor-pointer" onClick={() => handleRemoveGroup(group)}>
                        ×
                      </span>
                    </Badge>
                  ))}
                </div>
              )}
            </>
          )}

          <div>
            <Label htmlFor="select-date">Select Date</Label>
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setShowCalendar(true)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
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
            <Label className="block mb-2">Select Visibility</Label>
            <RadioGroup
              defaultValue="public"
              className="flex justify-between"
              onValueChange={(value) => setVisibility(value as "public" | "members")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="members" id="members" />
                <Label htmlFor="members">Only for Members</Label>
              </div>
            </RadioGroup>
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

          {visibility === "members" && (
            <div className="mt-4">
              <Label className="block mb-2">Attendance</Label>
              <RadioGroup
                defaultValue="mandatory"
                className="flex justify-between"
                onValueChange={(value) => setAttendance(value as "mandatory" | "optional")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mandatory" id="mandatory" />
                  <Label htmlFor="mandatory">Mandatory</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="optional" id="optional" />
                  <Label htmlFor="optional">Optional</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onCancel} className="rounded-[8px] h-12 ">
          Cancel
        </Button>
        <Button className="bg-[#003081]  h-12 rounded:[8px] text-white hover:bg-[#002060]">Create</Button>
      </div>
    </div>
  )
}
