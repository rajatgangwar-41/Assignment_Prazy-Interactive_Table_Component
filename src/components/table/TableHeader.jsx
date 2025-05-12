import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const TableHeaderComponent = ({
  columnOrder,
  columnWidths,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleResizeStart,
  requestSort,
  getSortIcon,
  allRowsSelected,
  toggleAllRowsSelection,
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-15 px-0 sticky left-0 z-20 border-r border-gray-300">
          <div className="w-15 flex items-center justify-center">
            <Checkbox
              checked={allRowsSelected}
              onCheckedChange={(checked) => toggleAllRowsSelection(!!checked)}
              aria-label="Select all rows"
            />
          </div>
        </TableHead>
        {columnOrder.map((key) => (
          <TableHead
            key={key}
            className={cn(
              "relative group border-b border-gray-300",
              key !== "name" && key !== "id" && "cursor-pointer select-none",
              "whitespace-nowrap",
              "border-r border-gray-300",
              "text-gray-900"
            )}
            style={{ width: columnWidths[key] }}
            draggable={key !== "name" && key !== "id"}
            onDragStart={(e) => handleDragStart(e, key)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, key)}
          >
            <div className="flex items-center gap-2">
              {key === "id" && "ID"}
              {key === "avatar" && "Avatar"}
              {key === "name" && "Name"}
              {key === "description" && "Description"}
              {key === "amount" && (
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-gray-700"
                  onClick={() => requestSort("amount")}
                >
                  Amount
                  {getSortIcon("amount") === "asc" && (
                    <ArrowUpDown className="w-4 h-4 rotate-180" />
                  )}
                  {getSortIcon("amount") === "desc" && (
                    <ArrowUpDown className="w-4 h-4" />
                  )}
                  {getSortIcon("amount") === "default" && (
                    <ArrowUpDown className="w-4 h-4" />
                  )}
                </Button>
              )}
              {key === "tooltip" && "Tooltip"}
              {key !== "name" && key !== "avatar" && key !== "id" && (
                <div
                  className="absolute top-1/2 right-0 h-6 w-1 -translate-y-1/2 translate-x-1/2 cursor-col-resize"
                  onMouseDown={(e) => handleResizeStart(e, key)}
                >
                  <div className="h-4 w-4 text-gray-500" />
                </div>
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
