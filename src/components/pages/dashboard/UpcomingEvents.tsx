"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import amico from "@/components/icons/images/CalendarIcon.jpg";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { format } from "date-fns";

interface User {
  _id: string;
  role: string;
}

interface Division {
  _id: string;
  name: string;
  members: User[];
}

interface Session {
  _id: string;
  date: string;
  status: string;
}

interface Attendance {
  status: string;
  sessionDate: string;
}

interface HeadsUp {
  status: string;
  createdAt: string;
}

export default function UpcomingEvent() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalDivisions, setTotalDivisions] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [upcomingSessions, setUpcomingSessions] = useState(0);
  const [chartData, setChartData] = useState<
    { name: string; thisYear: number; lastYear: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;

        // Fetch all data in parallel
        const [
          usersResponse,
          divisionsResponse,
          sessionsResponse,
          attendanceResponse,
          headsUpResponse,
        ] = await Promise.all([
          api.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: false,
          }),
          api.get("/division", {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: false,
          }),
          api.get("/session", {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: false,
          }),
          api.get("/attendance/all", {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: false,
          }),
          api.get("/headsUp", {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: false,
          }),
        ]);

        /// In the fetchData function, modify the users filtering part:

        // Process data
        const users = usersResponse.data.data;
        const divisions = divisionsResponse.data.data;
        const sessions = sessionsResponse.data;
        const attendanceRecords = attendanceResponse.data;
        const headsUpRecords = headsUpResponse.data;

        // Calculate metrics
        const memberCount = users.length; // Changed from filtering to counting all users
        const divisionCount = divisions.length;

        // Rest of the code remains the same...

        // Calculate attendance rate
        const presentCount = attendanceRecords.filter(
          (a: Attendance) => a.status === "present"
        ).length;
        const absentCount = attendanceRecords.filter(
          (a: Attendance) => a.status === "absent"
        ).length;
        const excusedCount = headsUpRecords.filter(
          (h: HeadsUp) => h.status === "approved"
        ).length;
        const totalRecords = presentCount + absentCount + excusedCount;
        const rate =
          totalRecords > 0
            ? Math.round((presentCount / totalRecords) * 100)
            : 0;

        // Count upcoming sessions
        const now = new Date();
        const upcoming = sessions.filter(
          (s: Session) => new Date(s.date) > now && s.status === "planned"
        ).length;

        // Set states
        setTotalMembers(memberCount);
        setTotalDivisions(divisionCount);
        setAttendanceRate(rate);
        setUpcomingSessions(upcoming);

        // Generate chart data (sample - you can replace with real data)
        setChartData([
          { name: "Jan", thisYear: 65, lastYear: 45 },
          { name: "Feb", thisYear: 59, lastYear: 51 },
          { name: "Mar", thisYear: 80, lastYear: 65 },
          { name: "Apr", thisYear: 81, lastYear: 60 },
          { name: "May", thisYear: presentCount > 0 ? rate : 76, lastYear: 57 },
          { name: "Jun", thisYear: 85, lastYear: 62 },
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="overflow-hidden w-full">
        <CardHeader className="w-full p-4">
          <div className="bg-blue-400 p-5 relative w-auto h-60 rounded-2xl">
            <div className="animate-pulse h-full w-full"></div>
          </div>
        </CardHeader>
        <CardContent className="px-3 flex flex-col space-y-4">
          <div className="grid grid-cols-2 divide-x gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-6 border-1 border-gray-200 rounded-[8px] m-2"
              >
                <div className="animate-pulse h-24 w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden w-full">
      <CardHeader className="w-full p-4">
        <div className="bg-blue-400 p-5 relative w-auto h-60 rounded-2xl">
          <div className="absolute w-19 h-5 top-5 right-5 bg-[#ff5c5c] text-white text-xs font-medium px-2 py-0.5 rounded-full">
            Members
          </div>
          <h2 className="text-xl font-bold mb-1">Upcoming Event</h2>
          <p className="text-base my-5 max-w-50">
            Cross-division knowledge-sharing
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-2 mt-11 ml-6 mb-2">
              <Button
                variant="default"
                className="bg-[#003087] w-28 h-12 hover:bg-[#002f87b7] text-white rounded-[10px]"
              >
                Add to calendar
              </Button>
            </div>
          </div>

          <div className="absolute right-23 bottom-10">
            <Image
              src={amico}
              alt="Event illustration"
              className="h[60] w-[120]"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3 flex flex-col space-y-4">
        <div className="grid grid-cols-2 divide-x gap-4">
          <div className="p-6 border-1 border-gray-200 rounded-[8px] m-2">
            <div className="flex items-center flexflex-col gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarIcon className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Members</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{totalMembers}</span>
              <Badge
                variant="outline"
                className="text-green-500 bg-green-50 border-green-100"
              >
                +4%
              </Badge>
            </div>
            <hr />
            <div className="text-xs text-gray-400 mt-1">
              Updated: {format(new Date(), "MMM dd, yyyy")}
            </div>
          </div>

          <div className="p-6 border-1 border-gray-200 rounded-[8px] m-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarIcon className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Divisions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{totalDivisions}</span>
              <Badge
                variant="outline"
                className="text-green-500 bg-green-50 border-green-100"
              >
                +2%
              </Badge>
            </div>
            <hr />
            <div className="text-xs text-gray-400 mt-1">
              Updated: {format(new Date(), "MMM dd, yyyy")}
            </div>
          </div>
        </div>
      </CardContent>

      <CardContent className="px-3">
        <div className="grid grid-cols-2 divide-x">
          <div className="p-6 border-1 border-gray-200 rounded-[8px] m-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarIcon className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Attendance Rate</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{attendanceRate}%</span>
              <Badge
                variant="outline"
                className="text-red-500 bg-red-50 border-red-100"
              >
                -3%
              </Badge>
            </div>
            <hr />
            <div className="text-xs text-gray-400 mt-1">
              Updated: {format(new Date(), "MMM dd, yyyy")}
            </div>
          </div>

          <div className="p-6 border-1 border-gray-200 rounded-[8px] m-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarIcon className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Upcoming Sessions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{upcomingSessions}</span>
              <Badge
                variant="outline"
                className="text-green-500 bg-green-50 border-green-100"
              >
                +10%
              </Badge>
            </div>
            <hr />
            <div className="text-xs text-gray-400 mt-1">
              Updated: {format(new Date(), "MMM dd, yyyy")}
            </div>
          </div>
        </div>
      </CardContent>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Attendance Overview</h4>
            <h3 className="text-6m font-medium">
              Total member: {totalMembers}
            </h3>
            <h3 className="text-3m font-medium">
              Total sessions: {upcomingSessions}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-xs">This year</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <span className="text-xs">Last year</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[190px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `${value}%`,
                  name === "thisYear" ? "This Year" : "Last Year",
                ]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="thisYear"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="lastYear"
                stroke="#d1d5db"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Card>
  );
}
