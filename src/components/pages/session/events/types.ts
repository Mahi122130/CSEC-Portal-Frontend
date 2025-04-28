// Define the types for both list and table sessions
export type ListSession = {
    id: string
    status: "planned" | "ended"
    division: string
    description: string
    date: string
    timeRemaining: string
    groups: string[]
    version: string
  }
  
  export type TableSession = {
    id: string
    date: string
    title: string
    type: string
    visibility: "Public" | "Private"
    status: "Draft" | "Published"
  }
  