// Define a function to generate a URL for API endpoints
exports.generateUrl = (endpoint, dbType, id) => {
  // Set the base URL with the endpoint
  let baseUrl = `http://localhost:3000/api/${endpoint}`;

  // Check if an ID is provided and not equal to 'all'
  if (id && id !== "all") {
    // Append the ID to the URL
    baseUrl += `/${id}`;
  }

  // Append the database type as a query parameter to the URL
  return `${baseUrl}?db=${dbType}`;
};
