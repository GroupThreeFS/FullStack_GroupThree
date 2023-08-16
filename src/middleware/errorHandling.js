/*Server Error handling should go here*/

module.exports = (err, req, res, next) => {
  // Log the error stack trace to the console
  console.error(err.stack);

  // Set the HTTP response status to the provided error status or 500 (Internal Server Error)
  // Render the 'error' view template with error information
  res.status(err.status || 500).render("error", {
    error: {
      status: err.status || 500,
      message: err.message || "An unexpected error occurred",
    },
  });
};
