//U94140233
// Load the CSV file and parse it
d3.csv("mock_stock_data.csv").then(function(data) {
    // Parse the data
    data.forEach(function(d) {
        d.Date = new Date(d.Date);
        d.Price = +d.Price;
    });

    // Initialize the visualization
    initializeVisualization(data);
});

function initializeVisualization(data) {
    // Create the initial table
    createTable(data);

    // Setup event listener for dropdown changes
    d3.select("#filterOptions").on("change", function() {
        const selectedOption = d3.select(this).property("value");
        let sortedData;

        switch (selectedOption) {
            case "dateAsc":
                sortedData = data.sort((a, b) => d3.ascending(a.Date, b.Date));
                break;
            case "dateDesc":
                sortedData = data.sort((a, b) => d3.descending(a.Date, b.Date));
                break;
            case "priceAsc":
                sortedData = data.sort((a, b) => d3.ascending(a.Price, b.Price));
                break;
            case "priceDesc":
                sortedData = data.sort((a, b) => d3.descending(a.Price, b.Price));
                break;
            case "company":
                sortedData = data.sort((a, b) => d3.ascending(a.Stock, b.Stock));
                break;
            default:
                sortedData = data;
        }

        // Update the table with sorted data
        createTable(sortedData);
    });
}
function createTable(data) {
    const svg = d3.select("#dataSVG");
    svg.selectAll("*").remove();

    // Create table headers
    const headers = ["Date", "Stock", "Price"];
    const headerRow = svg.append("g").attr("transform", "translate(50, 20)");

    headers.forEach((header, i) => {
        headerRow.append("text")
            .attr("x", i * 100)
            .attr("y", 0)
            .text(header)
            .attr("font-weight", "bold");
    });

    // Create table rows
    data.forEach((d, i) => {
        const row = svg.append("g").attr("transform", `translate(50, ${(i + 1) * 20 + 20})`);

        row.append("text").attr("x", 0).attr("y", 0).text(d.Date.toLocaleDateString());
        row.append("text").attr("x", 100).attr("y", 0).text(d.Stock);
        row.append("text").attr("x", 200).attr("y", 0).text(d.Price);
    });
}