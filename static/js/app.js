// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
      });
  });
}
// 1. Create variable to track all filters as object
var filters = {};


// Add date & time
function updateFilters() {

  let changedElement = d3.select(this);

  let value = changedElement.property("value");

  let id = changedElement.attr("id");

  if (value != "") {
    filters[id] = value;
  } else {
    delete filters[id];
  }

  filterTable();


  // Rebuild the table using the filtered data
  function filterTable() {
    let filtered-Data = tableData;
    Object.entries(filters).forEach(function([key, value]) {
      filtered_data = filtered_data.filter(row => row[key] === value);
  });

  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
  
}

d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);