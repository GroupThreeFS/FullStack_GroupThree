exports.generateUrl = (endpoint, dbType, id) => {
  // Set the base URL with the specified endpoint and default base URL
  let baseUrl = `http://localhost:3000/api/${endpoint}`;

  // If an 'id' is provided and it's not 'all', append it to the URL
  if (id && id !== "all") {
    baseUrl += `/${id}`;
  }

  // Append the 'dbType' as a query parameter to the URL
  return `${baseUrl}?db=${dbType}`;
};
