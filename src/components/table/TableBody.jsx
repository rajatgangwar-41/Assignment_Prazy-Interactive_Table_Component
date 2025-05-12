import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export const TableBodyComponent = ({
  data,
  columnOrder,
  columnWidths,
  selectedRows,
  toggleRowSelection,
}) => {
  return (
    <TableBody>
      {data.map((item) => (
        <TableRow
          key={item.id}
          className={cn(selectedRows.includes(item.id) && "bg-gray-100/50")}
        >
          <TableCell className="px-0 sticky left-0 z-20 border-r border-gray-300">
            <div className="flex items-center justify-center">
              <Checkbox
                checked={selectedRows.includes(item.id)}
                onCheckedChange={() => toggleRowSelection(item.id)}
                aria-label={`Select row ${item.name}`}
              />
            </div>
          </TableCell>
          {columnOrder.map((key) => (
            <TableCell
              key={key}
              className={cn(
                "relative whitespace-nowrap border-b border-gray-300 border-r",
                "text-gray-700"
              )}
              style={{ width: columnWidths[key] }}
            >
              {key === "id" && item.id}
              {key === "avatar" && (
                <div className="flex items-center justify-center">
                  <img
                    src={item.avatar}
                    alt={`Avatar of ${item.name}`}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              {key === "name" && item.name}
              {key === "description" && item.description}
              {key === "amount" && (
                <span className="font-mono">₹{item.amount.toFixed(0)}</span>
              )}
              {key === "tooltip" && item.tooltip}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
