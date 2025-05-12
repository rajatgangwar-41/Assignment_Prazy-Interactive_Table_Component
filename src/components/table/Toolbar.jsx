import React from "react"
import { Button } from "@/components/ui/button"
import { File } from "lucide-react"

export const Toolbar = ({
  selectedCount,
  clearAllSelections,
  exportData,
  data,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        variant="outline"
        onClick={() => exportData(data, "table_data")}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        <File className="w-4 h-4 mr-2" /> Export to Excel
      </Button>
      {selectedCount > 0 && (
        <>
          <Button
            variant="destructive"
            onClick={clearAllSelections}
            className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
          >
            Clear All
          </Button>
          <span className="text-gray-700">
            {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
          </span>
        </>
      )}
    </div>
  )
}
