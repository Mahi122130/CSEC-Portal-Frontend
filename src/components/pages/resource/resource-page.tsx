"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, ChevronDown, ChevronUp, FileText, Edit } from "lucide-react"
import AddResourceModal from "@/components/pages/resource/add-resource-model"

interface Resource {
  id: number
  name: string
  link: string
}

export default function ResourcePage() {
  const [showAddResourceModal, setShowAddResourceModal] = useState(false)
  const [cpdExpanded, setCpdExpanded] = useState(true)
  const [devExpanded, setDevExpanded] = useState(false)

  const [cpdResources, setCpdResources] = useState<Resource[]>([
    { id: 1, name: "CodeMentor Community Course", link: "#" },
    { id: 2, name: "RoadMap To Mobile Dev Structure", link: "#" },
    { id: 3, name: "Progress Sheet", link: "#" },
  ])

  const [devResources, setDevResources] = useState<Resource[]>([])

  const handleAddResource = (division: string, name: string, link: string) => {
    const newResource = { id: Math.random(), name, link }

    if (division === "cpd") {
      setCpdResources([...cpdResources, newResource])
    } else {
      setDevResources([...devResources, newResource])
    }

    setShowAddResourceModal(false)
  }

  return (
    <div className=" min-h-screen p-4">
      <div className="max-w-full mx-auto">
        <div className="space-y-1">
          {/* CPD Section */}
          <div className=" rounded-md shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium text-gray-900">CPD</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload resources and progress sheet for the CPD division.
                  </p>
                </div>
                <Button
                  className="h-10 px-6 rounded-[8px] bg-[#003081] hover:bg-[#002a6e] text-white flex items-center gap-1.5"
                  onClick={() => setShowAddResourceModal(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add Resource
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-100">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setCpdExpanded(!cpdExpanded)}
              >
                <h3 className="font-medium text-sm">Resources({cpdResources.length})</h3>
                {cpdExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {cpdExpanded && (
                <div className="border-t border-gray-100">
                  {cpdResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{resource.name}</span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dev Division Section */}
          <div className=" rounded-md shadow-sm overflow-hidden">
            <div className="p-4">
              <div>
                <h2 className="font-medium">Dev Division</h2>
                <p className="text-sm text-gray-500 mt-1">Upload resources and progress sheet for the Dev division.</p>
              </div>
            </div>

            <div className="border-t border-gray-100">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setDevExpanded(!devExpanded)}
              >
                <h3 className="font-medium text-sm">Resources({devResources.length})</h3>
                {devExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {devExpanded && (
                <div className="border-t border-gray-100">
                  {devResources.length > 0 ? (
                    devResources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{resource.name}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">No resources available</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddResourceModal && (
        <AddResourceModal
          onClose={() => setShowAddResourceModal(false)}
          onAdd={(name, link) => handleAddResource("cpd", name, link)}
        />
      )}
    </div>
  )
}