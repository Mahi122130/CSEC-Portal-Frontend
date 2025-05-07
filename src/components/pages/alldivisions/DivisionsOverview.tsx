"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DivisionCardComponent from "@/components/pages/alldivisions/DivisionCard";

interface Member {
  _id: string;
  name?: string;
  email?: string;
}

interface Group {
  _id: string;
  name: string;
  division: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Division {
  division: string;
  divisionID: string;
}

interface FrontendDivision {
  id: string;
  name: string;
  totalMembers: number;
  groups: {
    id: string;
    name: string;
    members: number;
    memberDetails?: Member[];
  }[];
}

const backendDivisions: Division[] = [
  { division: "CPD", divisionID: "680a9a2b9e86262d7c618bd1" },
  { division: "DEV", divisionID: "680a9a2c9e86262d7c618bd4" },
  { division: "CYBER", divisionID: "680a9a2d9e86262d7c618bd7" },
  { division: "DATA SCIENCE", divisionID: "680a9a2e9e86262d7c618bda" }
];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
});

export default function DivisionsOverview() {
  const [searchQuery] = useState("");
  const [divisions, setDivisions] = useState<FrontendDivision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDivisionGroups = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = Cookies.get('accessToken');
        if (!token) {
          throw new Error("Authentication required");
        }

        const results = await Promise.all(
          backendDivisions.map(async (division) => {
            try {
              const response = await api.get(`/group/${division.divisionID}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'ngrok-skip-browser-warning': 'true'
                }
              });
              
              const groups: Group[] = response.data;
              
              const groupsWithMembers = await Promise.all(
                groups.map(async (group) => {
                  try {
                    if (group.members.length === 0) {
                      return {
                        id: group._id,
                        name: group.name,
                        members: 0,
                        memberDetails: []
                      };
                    }

                    const memberDetails = await Promise.all(
                      group.members.map(memberId => 
                        api.get(`/user/${memberId}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                          }
                        }).then(res => res.data)
                      )
                    );

                    return {
                      id: group._id,
                      name: group.name,
                      members: group.members.length,
                      memberDetails
                    };
                  } catch (err) {
                    console.error(`Error fetching members for group ${group._id}`);
                    return {
                      id: group._id,
                      name: group.name,
                      members: group.members.length,
                      memberDetails: []
                    };
                  }
                })
              );
              
              return {
                id: division.divisionID,
                name: division.division,
                totalMembers: groupsWithMembers.reduce((sum, group) => sum + group.members, 0),
                groups: groupsWithMembers
              };
            } catch (err) {
              console.error(`Error processing ${division.division}`);
              return {
                id: division.divisionID,
                name: division.division,
                totalMembers: 0,
                groups: []
              };
            }
          })
        );
        
        setDivisions(results);
      } catch (err) {
        setError('Failed to load division data. Some information may be incomplete.');
        console.error("Overall fetch error:", err);
        
        if (err instanceof Error && (err.message === "Authentication required" || 
            (err as any).response?.status === 401)) {
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchDivisionGroups();
  }, []);
    
  const filteredDivisions = divisions.filter((division) =>
    division.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-4">Loading divisions...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  // Get specific divisions
  const cpdDivision = filteredDivisions.find(d => d.name === "CPD");
  const devDivision = filteredDivisions.find(d => d.name === "DEV");
  const cyberDivision = filteredDivisions.find(d => d.name === "CYBER");
  const dataScienceDivision = filteredDivisions.find(d => d.name === "DATA SCIENCE");

  return (
    <div className="space-y-6 p-3 w-full">
      {/* First row - CPD and DEV */}
      <div className="flex gap-2">
        {cpdDivision && (
          <div className="flex-1">
            <DivisionCardComponent division={cpdDivision} />
          </div>
        )}
        {devDivision && (
          <div className="flex-1">
            <DivisionCardComponent division={devDivision} />
          </div>
        )}
      </div>

      {/* Second row - CYBER and DATA SCIENCE */}
      <div className="flex gap-1">
        {cyberDivision && (
          <div className="flex-1">
            <DivisionCardComponent division={cyberDivision} />
          </div>
        )}
        {dataScienceDivision && (
          <div className="flex-1">
            <DivisionCardComponent division={dataScienceDivision} />
          </div>
        )}
      </div>
    </div>
  );
}