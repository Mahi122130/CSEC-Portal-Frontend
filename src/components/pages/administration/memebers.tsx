"use client"

import { useState } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MembersPage({ onBackClick }: { onBackClick?: () => void }) {
  const router = useRouter()
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const members = [
    {
      id: "UGR/25/05/14",
      name: "Darlene Robertson",
      avatar: "/placeholder.svg?height=40&width=40",
      division: "Design",
      attendance: "Active",
      attendanceColor: "bg-green-100 text-green-800",
      year: "4th",
      status: "On Campus",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "UGR/25/05/14",
      name: "Floyd Miles",
      avatar: "/placeholder.svg?height=40&width=40",
      division: "Development",
      attendance: "Active",
      attendanceColor: "bg-green-100 text-green-800",
      year: "5th",
      status: "Off Campus",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: "UGR/25/05/14",
      name: "Cody Fisher",
      avatar: "/placeholder.svg?height=40&width=40",
      division: "CPD",
      attendance: "Needs Attention",
      attendanceColor: "bg-yellow-100 text-yellow-800",
      year: "3rd",
      status: "Withdrawn",
      statusColor: "bg-purple-100 text-purple-800",
    },
    {
      id: "UGR/25/05/14",
      name: "Cody Fisher",
      avatar: "/placeholder.svg?height=40&width=40",
      division: "CPD",
      attendance: "Needs Attention",
      attendanceColor: "bg-yellow-100 text-yellow-800",
      year: "3rd",
      status: "Withdrawn",
      statusColor: "bg-purple-100 text-purple-800",
    },
    {
      id: "UGR/25/05/14",
      name: "Cody Fisher",
      avatar: "/placeholder.svg?height=40&width=40",
      division: "CPD",
      attendance: "Needs Attention",
      attendanceColor: "bg-yellow-100 text-yellow-800",
      year: "3rd",
      status: "Withdrawn",
      statusColor: "bg-purple-100 text-purple-800",
    },
  ]

  const toggleSelectAll = () => {
    setSelectedMembers(prev => 
      prev.length === members.length ? [] : members.map(m => m.id)
    )
  }

  const toggleSelectMember = (id: string) => {
    setSelectedMembers(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <Button
            variant="default"
            className="bg-[#003081] text-white text-base h-11 px-6 rounded-[8px]"
            disabled={selectedMembers.length === 0}
          >
            Remove Selected
          </Button>

          <Button
            variant="outline"
            className="bg-white text-gray-800 text-base h-11 px-6 rounded-[8px] flex items-center gap-2 border border-gray-300"
          >
            <Filter className="h-5 w-5" />
            Filter
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedMembers.length === members.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Division
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {members.map((member, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => toggleSelectMember(member.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.division}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.attendanceColor}`}>
                    {member.attendance}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.statusColor}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
          <span className="font-medium">50</span> records
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
