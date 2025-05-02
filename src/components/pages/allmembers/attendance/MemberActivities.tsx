"use client"

import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import api from "@/lib/axios"
import Cookies from "js-cookie"

interface AttendanceData {
  _id: string
  profile: string
  sessionDate: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface HeadsUpData {
  _id: string
  profile: string
  session: string
  reason: string
  type?: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export function MemberActivities() {
  return (
    <div className="flex rounded-lg border-1 border-gray-300 w-full my-5 mr-3">
      <div className="min-w-175 w-full">
        <ActivityTable />
      </div>
    </div>
  )
}

function ActivityTable() {
  const [activities, setActivities] = useState<AttendanceData[]>([])
  const [headsUpApproved, setHeadsUpApproved] = useState<HeadsUpData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('accessToken')
        if (!token) return

        const urlParams = new URLSearchParams(window.location.search)
        const memberId = urlParams.get('id')
        
        if (!memberId) return

        const [attendanceResponse, headsUpResponse] = await Promise.all([
          api.get(`/attendance/${memberId}`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true'
            },
            withCredentials: false
          }),
          api.get(`headsUp/user/${memberId}`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true'
            },
            withCredentials: false
          })
        ])

        if (attendanceResponse.data?.data) {
          setActivities(attendanceResponse.data.data)
        }

        if (headsUpResponse.data) {
          setHeadsUpApproved(headsUpResponse.data.filter(
            (item: HeadsUpData) => item.status === "approved"
          ))
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Combine all records: attendance + heads-up approved as excused
  const allRecords = [
    ...activities.map(a => ({
      ...a,
      source: 'attendance',
      displayStatus: a.status // present or absent
    })),
    ...headsUpApproved.map(h => ({
      ...h,
      source: 'headsUp',
      sessionDate: h.createdAt, // Using heads-up creation date
      displayStatus: 'excused'
    }))
  ]

  // Sort by date
  const sortedRecords = [...allRecords].sort((a, b) => 
    new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime()
  )

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500">Date</TableHead>
            <TableHead className="text-gray-500">Session</TableHead>
            <TableHead className="text-gray-500">Start-Time</TableHead>
            <TableHead className="text-gray-500">End-Time</TableHead>
            <TableHead className="text-gray-500">Status</TableHead>
            <TableHead className="text-gray-500">Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              Loading data...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  if (sortedRecords.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500">Date</TableHead>
            <TableHead className="text-gray-500">Session</TableHead>
            <TableHead className="text-gray-500">Start-Time</TableHead>
            <TableHead className="text-gray-500">End-Time</TableHead>
            <TableHead className="text-gray-500">Status</TableHead>
            <TableHead className="text-gray-500">Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              No records found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-500">Date</TableHead>
          <TableHead className="text-gray-500">Session</TableHead>
          <TableHead className="text-gray-500">Start-Time</TableHead>
          <TableHead className="text-gray-500">End-Time</TableHead>
          <TableHead className="text-gray-500">Status</TableHead>
          <TableHead className="text-gray-500">Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRecords.map((record) => {
          const sessionDate = new Date(record.sessionDate)
          const formattedDate = format(sessionDate, "MMM dd, yyyy")
          const formattedTime = format(sessionDate, "hh:mm a")
          const endTime = new Date(sessionDate.getTime() + 60 * 60 * 1000)
          const formattedEndTime = format(endTime, "hh:mm a")

          return (
            <TableRow key={record._id}>
              <TableCell>{formattedDate || ''}</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>{formattedTime || ''}</TableCell>
              <TableCell>{formattedEndTime || ''}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "rounded px-2 py-1 text-xs font-medium",
                    "border-0",
                    record.displayStatus === "present" && "bg-green-100 text-green-500",
                    record.displayStatus === "excused" && "bg-yellow-100 text-yellow-500",
                    record.displayStatus === "absent" && "bg-red-100 text-red-500",
                  )}
                >
                  {record.displayStatus.charAt(0).toUpperCase() + record.displayStatus.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}