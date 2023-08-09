/*Server Error handling should go here*/

module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(err.status || 500).render('error', {
        error: {
            status: err.status || 500,
            message: err.message || 'An unexpected error occurred',
        },
    });
  };