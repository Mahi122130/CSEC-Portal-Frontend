"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Cookies from "js-cookie";

interface MemberData {
  _id: string;
  email: string;
  role: string;
  personal_info?: {
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    university_id?: string;
    graduation_year?: number;
    phone_number?: string;
    specialization?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function ProfileHeader() {
  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSeen, setLastSeen] = useState<string>("");

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const token = Cookies.get('accessToken');
        if (!token) return;

        const urlParams = new URLSearchParams(window.location.search);
        const memberId = urlParams.get('id');
        
        if (!memberId) return;

        const response = await api.get(`/user/${memberId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
          withCredentials: false
        });

        if (response.data?.user) {
          setMember(response.data.user);
        }

        const lastSeenResponse = await api.get(`/user/${memberId}/last-seen`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
          withCredentials: false
        });

        if (lastSeenResponse.data?.lastSeen) {
          const now = new Date();
          const lastSeenDate = new Date(lastSeenResponse.data.lastSeen);
          const diffInSeconds = Math.floor((now.getTime() - lastSeenDate.getTime()) / 1000);
          setLastSeen(diffInSeconds < 120 ? "online" : formatDate(lastSeenDate));
        }
      } catch (error) {
        console.error("Failed to fetch member data:", error);
      } finally {
        setLoading(false);
      }
    };

    const formatDate = (date: Date): string => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };

    fetchMemberData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-54">Loading...</div>;
  }

  if (!member) {
    return <div className="flex justify-center items-center h-54">Member not found</div>;
  }

  const fullName = member.personal_info?.first_name || member.personal_info?.last_name
    ? `${member.personal_info.first_name || ""} ${member.personal_info.last_name || ""}`.trim()
    : member.email.split("@")[0];

  return (
    <div className="flex justify-center relative h-54 rounded-[8px] w-full">
      <div
        className="h-52 bg-[#001C5DCC] rounded-[8px] relative w-235"
        style={{ padding: "12px" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center blur-lg opacity-50" 
          style={{ 
            backgroundImage: `url('${member.personal_info?.profile_picture || "https://github.com/shadcn.png"}')` 
          }} 
        />
        <div className="relative z-10 h-full">
          <div className="absolute bottom-6 left-13 transform translate-y-1/2 flex items-end gap-4">
            <div className="flex items-center justify-center h-23 w-23 rounded-full">
              <Image
                src={member.personal_info?.profile_picture || "https://github.com/shadcn.png"}
                alt={fullName}
                width={92}
                height={92}
                className="flex items-center justify-center h-23 w-23 rounded-full object-cover"
              />
            </div>
            <div className="flex gap-5 text-white" style={{ marginBottom: "22px" }}>
              <div>
                <h2 className="font-semibold text-2xl">{fullName}</h2>
                <p className="text-[16px] opacity-90 capitalize">{member.personal_info?.specialization}</p>
              </div>
              {lastSeen === "online" ? (
                <p className="flex items-end text-sm  text-green-400 font-medium">online</p>
              ) : (
                <p className="flex items-end text-sm opacity-90">last seen {lastSeen || "recently"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}