import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pagination() {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-xs text-gray-500">Showing 1 to 12 of 42 results</div>

      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm" className="h-8 w-8 bg-blue-50 text-blue-600 border-blue-200">
          1
        </Button>

        <Button variant="outline" size="sm" className="h-8 w-8">
          2
        </Button>

        <Button variant="outline" size="sm" className="h-8 w-8">
          3
        </Button>

        <Button variant="outline" size="sm" className="h-8 w-8">
          4
        </Button>

        <Button variant="outline" size="sm" className="h-8 w-8">
          5
        </Button>

        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
