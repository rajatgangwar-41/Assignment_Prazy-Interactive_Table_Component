# Interactive Table Component

This React component provides an interactive table with features like:

- **Data Fetching:** Fetches data from a backend API.
- **Column Reordering:** Drag and drop to reorder columns (excluding 'ID' and 'Name').
- **Column Resizing:** Drag the right border of column headers to resize.
- **Row Selection:** Checkboxes to select individual or all rows.
- **Sorting:** Click on sortable column headers ('Amount') to sort data.
- **Pagination:** Navigate through data pages and control the number of rows per page.
- **Export to Excel:** Download table data as a .xlsx file.
- **Loading and Error States:** Clear visual feedback during data loading and in case of errors.

## Setup

1.  **Clone the repository**
2.  **Navigate to the component's directory**
3.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn add
    ```

    This component uses the following dependencies:

    - `react`
    - `@/components/ui/button`
    - `@/components/ui/checkbox`
    - `@/components/ui/table`
    - `@/components/ui/input`
    - `lucide-react`
    - `axios`
    - `@/lib/utils`

    Make sure these are installed in your project.

4.  **Backend API:** This component fetches data from `https://rajatgangwar-assignment-interactive.onrender.com/`. Ensure you have a backend running at this URL that serves an array of objects with the following structure (or adapt the component accordingly):

    ```json
    [
      "data": {
        "id": 1,
        "avatar": "...",
        "name": "Item 1",
        "description": "Description for item 1",
        "amount": 100,
        "tooltip": "Tooltip for item 1"
      }
      // ... more items
    ]
    ```

## Key Features

- **Interactive Column Management:**

  - **Drag to Reorder:** Click and drag column headers (excluding "ID" and "Name") to change their order.
  - **Resize Columns:** Drag the vertical resize handle on the right side of the column headers to adjust their widths.

- **Row Selection:**

  - **Individual Selection:** Use the checkboxes in each row to select specific items.
  - **Select All:** A checkbox in the table header allows you to select or deselect all rows on the current page.
  - **Clear Selection:** A "Clear All" button appears when rows are selected to deselect them.

- **Data Sorting:**

  - Click the "Amount" column header to sort the data in ascending or descending order. An arrow indicator shows the current sort direction.

- **Pagination:**

  - Control the number of rows displayed per page using the "Rows per page" input.
  - Navigate between pages using the "Previous" and "Next" buttons.
  - The current page number and total number of pages are displayed.

- **Data Export:**

  - Click the "Export to Excel" button to download the current table data as a .xlsx file.

- **Loading and Error Handling:**

  - A loading spinner is displayed while data is being fetched.
  - An error message is shown if the data fetching fails.

- **License:**
  - Rajat Gangwar.
