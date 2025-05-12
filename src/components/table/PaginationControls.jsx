import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const PaginationControls = ({
  currentPage,
  totalPages,
  rowsPerPage,
  handleRowsPerPageChange,
  goToPage,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <Input
          type="number"
          min="1"
          value={rowsPerPage}
          onChange={(e) => handleRowsPerPageChange(e.target.value)}
          className="w-20 h-8 bg-gray-100 text-gray-700 border-gray-300"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
