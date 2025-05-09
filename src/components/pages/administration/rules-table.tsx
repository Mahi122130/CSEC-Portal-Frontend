import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RulesTable() {
  const [editableRules, setEditableRules] = useState([
    {
      id: 1,
      name: "Max Absences",
      description: "Members exceeding this cap flagged for review.",
      value: "3",
      isEditing: false
    },
    {
      id: 2,
      name: "Warning After",
      description: "Members receive a warning notification after this many absences.",
      value: "2",
      isEditing: false
    },
    {
      id: 3,
      name: "Suspend After",
      description: "Members automatically suspended.",
      value: "4",
      isEditing: false
    },
    {
      id: 4,
      name: "Fire After",
      description: "Members removed from division can rejoin later.",
      value: "5",
      isEditing: false
    }
  ]);

  const handleValueChange = (id: number, newValue: string) => {
    setEditableRules(editableRules.map(rule => 
      rule.id === id ? { ...rule, value: newValue } : rule
    ));
  };

  const toggleEdit = (id: number) => {
    setEditableRules(editableRules.map(rule => 
      rule.id === id ? { ...rule, isEditing: !rule.isEditing } : rule
    ));
  };

  return (
    <div className="space-y-4">
      {editableRules.map((rule, index) => (
        <div
          key={rule.id}
          className="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div className="flex-1">
            <h3 className="font-medium">{rule.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
          </div>

          <div className="ml-4">
            {rule.isEditing ? (
              <input
                type="text"
                value={rule.value}
                onChange={(e) => handleValueChange(rule.id, e.target.value)}
                onBlur={() => toggleEdit(rule.id)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white w-16 text-sm font-medium text-gray-700"
                autoFocus
              />
            ) : (
              <div 
                className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer"
                onClick={() => toggleEdit(rule.id)}
              >
                <span className="text-sm font-medium text-gray-700">
                  {rule.value}
                </span>
                {index !== editableRules.length - 1 && (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}