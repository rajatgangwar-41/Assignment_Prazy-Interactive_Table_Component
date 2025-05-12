import { useState } from "react"

export const useColumnReorder = (initialOrder) => {
  const [columnOrder, setColumnOrder] = useState(initialOrder)
  const [draggedColumn, setDraggedColumn] = useState(null)

  const handleDragStart = (e, columnKey) => {
    setDraggedColumn(columnKey)
    e.dataTransfer.setData("text/plain", columnKey)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetColumn) => {
    e.preventDefault()
    if (
      !draggedColumn ||
      draggedColumn === targetColumn ||
      targetColumn === "id"
    )
      return

    const newOrder = [...columnOrder]
    const draggedIndex = newOrder.indexOf(draggedColumn)
    const targetIndex = newOrder.indexOf(targetColumn)

    if (draggedIndex === -1 || targetIndex === -1) return

    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedColumn)
    setColumnOrder(newOrder)
    setDraggedColumn(null)
  }

  return { columnOrder, handleDragStart, handleDragOver, handleDrop }
}
