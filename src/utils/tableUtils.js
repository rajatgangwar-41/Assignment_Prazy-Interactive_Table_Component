export const sortData = (data, sortConfig) => {
  if (!sortConfig) return data

  return [...data].sort((a, b) => {
    const valA = a[sortConfig.key]
    const valB = b[sortConfig.key]

    if (typeof valA === "number" && typeof valB === "number") {
      return sortConfig.direction === "ascending" ? valA - valB : valB - valA
    }
    if (typeof valA === "string" && typeof valB === "string") {
      return sortConfig.direction === "ascending"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }
    if (valA < valB) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (valA > valB) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })
}

export const paginateData = (data, currentPage, rowsPerPage) => {
  return data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
}
