import * as XLSX from "xlsx"

export const exportToExcel = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn("No data to export.")
    return
  }

  // Create a new workbook
  const wb = XLSX.utils.book_new()

  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data)

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

  // Generate Excel file and download it
  XLSX.writeFile(wb, `${filename}.xlsx`)
}
