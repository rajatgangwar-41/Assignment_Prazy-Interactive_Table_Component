import { useState } from "react"

export const useTableSort = () => {
  const [sortConfig, setSortConfig] = useState(null)

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return "default"
    }
    return sortConfig.direction === "ascending" ? "asc" : "desc"
  }

  return { sortConfig, requestSort, getSortIcon }
}
