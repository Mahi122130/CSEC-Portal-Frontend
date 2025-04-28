"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import RequiredInformation from "@/components/pages/profile/requiredinformation"
import OptionalInformation from "@/components/pages/profile/optionalinformation"
import Resources from "@/components/pages/profile/resource"
import { UserIcon, FileTextIcon, FolderIcon } from "lucide-react"

export default function MultiStepForm() {
  const [activeTab, setActiveTab] = useState("required")
  const [formData, setFormData] = useState({
    // Required Information
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    expectedGradYear: "",
    otherDepartment: "",
    github: "",
    telegramHandle: "",
    member: "",
    photo: null as File | null,

    // Optional Information
    universityId: "",
    linkedinAccount: "",
    codeforces: "",
    leetcode: "",
    instagramHandle: "",
    optionalDateOfBirth: "",
    joiningDate: "",
    bio: "",
    cv: null as File | null,

    // Resources
    resources: [{ name: "", link: "" }],
  })

  const handleChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleResourceChange = (index: number, field: string, value: string) => {
    const updatedResources = [...formData.resources]
    updatedResources[index] = { ...updatedResources[index], [field]: value }
    setFormData((prev) => ({
      ...prev,
      resources: updatedResources,
    }))
  }

  const addResource = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, { name: "", link: "" }],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Here you would typically send the data to your backend
    // You'd need to handle the file uploads separately, usually with FormData

    const submitFormData = new FormData()

    // Append all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "photo" && key !== "cv" && key !== "resources") {
        submitFormData.append(key, value as string)
      }
    })

    // Append resources
    formData.resources.forEach((resource, index) => {
      submitFormData.append(`resourceName${index + 1}`, resource.name)
      submitFormData.append(`resourceLink${index + 1}`, resource.link)
    })

    // Append files
    if (formData.photo) {
      submitFormData.append("photo", formData.photo)
    }

    if (formData.cv) {
      submitFormData.append("cv", formData.cv)
    }

    // Example of how you might submit this to an API
    // const response = await fetch('/api/submit-application', {
    //   method: 'POST',
    //   body: submitFormData,
    // })

    alert("Form submitted successfully!")
  }

  const handleNext = () => {
    if (activeTab === "required") {
      setActiveTab("optional")
    } else if (activeTab === "optional") {
      setActiveTab("resources")
    }
  }

  const handlePrevious = () => {
    if (activeTab === "optional") {
      setActiveTab("required")
    } else if (activeTab === "resources") {
      setActiveTab("optional")
    }
  }

  return (
    <div className="max-w-full mx-auto  rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="required"
              className="flex items-center gap-2 data-[state=active]:text-[#003081] data-[state=active]:border-b-2 data-[state=active]:border-[#003081]"
            >
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Required Information</span>
            </TabsTrigger>
            <TabsTrigger
              value="optional"
              className="flex items-center gap-2 data-[state=active]:text-[#003081] data-[state=active]:border-b-2 data-[state=active]:border-[#003081]"
            >
              <FileTextIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Optional Information</span>
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex items-center gap-2 data-[state=active]:text-[#003081] data-[state=active]:border-b-2 data-[state=active]:border-[#003081]"
            >
              <FolderIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="required">
            <RequiredInformation
              formData={formData}
              handleChange={handleChange}
              onNext={handleNext}
              onCancel={handlePrevious}
            />
          </TabsContent>

          <TabsContent value="optional">
            <OptionalInformation formData={formData} handleChange={handleChange} />
            <div className="flex justify-between p-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Cancel
              </Button>
              <Button type="button" onClick={handleNext} className="bg-[#003081] hover:bg-[#002060]">
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <Resources
              formData={formData}
              handleChange={handleChange}
              handleResourceChange={handleResourceChange}
              addResource={addResource}
            />
            <div className="flex justify-between p-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#003081] hover:bg-[#002060]">
                Save
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
