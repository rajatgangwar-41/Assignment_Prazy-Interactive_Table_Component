import React, { useState, useEffect, useRef } from "react"
import { Table } from "@/components/ui/table"
import { TableIcon, Loader2, AlertTriangle } from "lucide-react"
import axios from "axios"
import {
  DEFAULT_COLUMN_ORDER,
  DEFAULT_COLUMN_WIDTHS,
  DEFAULT_ROWS_PER_PAGE,
} from "@/lib/constants/tableConstants"
import { exportToExcel } from "../../utils/exportUtils"
import { sortData, paginateData } from "../../utils/tableUtils"
import { useColumnResize } from "../../hooks/useColumnResize"
import { useColumnReorder } from "../../hooks/useColumnReorder"
import { useTableSort } from "../../hooks/useTableSort"
import { TableHeaderComponent } from "./TableHeader"
import { TableBodyComponent } from "./TableBody"
import { PaginationControls } from "./PaginationControls"
import { Toolbar } from "./Toolbar"

const API_BASE_URL = "https://rajatgangwar-assignment-interactive.onrender.com"

export const TableContainer = () => {
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)

  // Custom hooks
  const { columnWidths, handleResizeStart } = useColumnResize(
    DEFAULT_COLUMN_WIDTHS
  )
  const { columnOrder, handleDragStart, handleDragOver, handleDrop } =
    useColumnReorder(DEFAULT_COLUMN_ORDER)
  const { sortConfig, requestSort, getSortIcon } = useTableSort()

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const dataResponse = await axios.get(`${API_BASE_URL}/data`)
        setData(dataResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load data.")
        setData([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Row selection handlers
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAllRowsSelection = (checked) => {
    setSelectedRows(checked ? data.map((item) => item.id) : [])
  }

  const clearAllSelections = () => {
    setSelectedRows([])
  }

  // Pagination handlers
  const goToPage = (page) => {
    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    setCurrentPage(page)
  }

  const handleRowsPerPageChange = (value) => {
    const newRowsPerPage = parseInt(value, 10)
    if (!isNaN(newRowsPerPage) && newRowsPerPage > 0) {
      setRowsPerPage(newRowsPerPage)
      setCurrentPage(1)
    }
  }

  // Data processing
  const sortedData = sortData(data, sortConfig)
  const paginatedData = paginateData(sortedData, currentPage, rowsPerPage)
  const totalPages = Math.ceil(sortedData.length / rowsPerPage)
  const selectedCount = selectedRows.length
  const allRowsSelected = selectedRows.length === data.length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        <span className="ml-2 text-gray-500">Loading data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <AlertTriangle className="w-8 h-8 mr-2" />
        {error}
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <TableIcon className="w-6 h-6 text-gray-700" /> Interactive Data
            Table
          </h1>
        </div>

        <div
          className="rounded-md border border-gray-200"
          style={{ overflowY: "auto" }}
        >
          <Table ref={tableRef} className="border-collapse min-w-full bg-white">
            <TableHeaderComponent
              columnOrder={columnOrder}
              columnWidths={columnWidths}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleResizeStart={handleResizeStart}
              requestSort={requestSort}
              getSortIcon={getSortIcon}
              allRowsSelected={allRowsSelected}
              toggleAllRowsSelection={toggleAllRowsSelection}
            />
            <TableBodyComponent
              data={paginatedData}
              columnOrder={columnOrder}
              columnWidths={columnWidths}
              selectedRows={selectedRows}
              toggleRowSelection={toggleRowSelection}
            />
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <Toolbar
            selectedCount={selectedCount}
            clearAllSelections={clearAllSelections}
            exportData={exportToExcel}
            data={data}
          />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
            goToPage={goToPage}
          />
        </div>
      </div>
    </div>
  )
}

export default TableContainer
