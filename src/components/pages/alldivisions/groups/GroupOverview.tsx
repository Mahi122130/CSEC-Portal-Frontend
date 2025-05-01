"use client";

import { useState } from "react";
import GroupCardComponents from "@/components/pages/alldivisions/groups/GroupCard";

// Group data model
interface Group {
  id: number;
  name: string;
  totalMembers: number;
  members: Members[];
}

// Sample data
interface Members {
  id: number;
  name: string;
  speciality: string;
  imgUrl?: string;
}

const GroupsData: Group[] = [
  {
    id: 1,
    name: "Group 1",
    totalMembers: 10,
    members: [
      {
        id: 1,
        name: "Mohammed Sadik",
        speciality: "Front-End",
        imgUrl: "https://avatars.githubusercontent.com/u/176960856?v=4",
      },
      {
        id: 2,
        name: "Kiya Kebe",
        speciality: "Full-Stack",
        imgUrl:
          "https://media.licdn.com/dms/image/v2/D4E03AQFkoyf763lEgA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718289469344?e=2147483647&v=beta&t=qoAMCeIxXD_kTzeUZApL6qb3mFzfjmGtB6ObIeJ_5-U",
      },
      {
        id: 3,
        name: "Mahelet Yared",
        speciality: "UI/UX Designer",
        imgUrl: "https://github.com/shadcn.png",
      },
      {
        id: 4,
        name: "Hussen Beshier",
        speciality: "Back-End",
        imgUrl: "https://github.com/shadcn.png",
      },
    ],
  },
  {
    id: 2,
    name: "Group 2",
    totalMembers: 15,
    members: [
      {
        id: 1,
        name: "John Smith",
        speciality: "Back-End",
        imgUrl: "https://github.com/shadcn.png",
      },
      {
        id: 2,
        name: "Estifanos Tadese",
        speciality: "UI/UX Designer",
        imgUrl: "https://github.com/shadcn.png",
      },
      {
        id: 3,
        name: "Kaleb Yonatan",
        speciality: "Full-Stack",
        imgUrl: "https://github.com/shadcn.png",
      },
      {
        id: 4,
        name: "Abdullah Abdulrehman",
        speciality: "Front-End",
        imgUrl: "https://github.com/shadcn.png",
      },
    ],
  },
];

export default function GroupOverview({ linkText = "View All" }: { linkText?: string }) {
  const [searchQuery] = useState("");

  const filteredDivisions = GroupsData.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap gap-4 w-full">
        {filteredDivisions.map((group) => (
          <GroupCardComponents
            key={group.id}
            division={group}
            className="flex-1 min-w-[calc(50%-1.5rem)]"
            linkText={linkText}
          />
        ))}
      </div>
    </div>
  );
}
