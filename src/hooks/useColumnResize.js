import { useState, useCallback, useEffect } from "react"

export const useColumnResize = (initialWidths) => {
  const [columnWidths, setColumnWidths] = useState(initialWidths)
  const [resizingColumn, setResizingColumn] = useState(null)
  const [startX, setStartX] = useState(0)

  const handleResizeStart = useCallback((e, columnKey) => {
    setResizingColumn(columnKey)
    setStartX(e.clientX)
  }, [])

  const handleResize = useCallback(
    (e) => {
      if (!resizingColumn) return
      const delta = e.clientX - startX
      setColumnWidths((prev) => {
        const newWidth = Math.max(50, prev[resizingColumn] + delta)
        return {
          ...prev,
          [resizingColumn]: newWidth,
        }
      })
      setStartX(e.clientX)
    },
    [resizingColumn, startX]
  )

  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null)
  }, [])

  useEffect(() => {
    if (resizingColumn) {
      window.addEventListener("mousemove", handleResize)
      window.addEventListener("mouseup", handleResizeEnd)
    }
    return () => {
      window.removeEventListener("mousemove", handleResize)
      window.removeEventListener("mouseup", handleResizeEnd)
    }
  }, [resizingColumn, handleResize, handleResizeEnd])

  return { columnWidths, handleResizeStart }
}
