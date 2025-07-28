function errorHandlerMiddleware(err, req, res, next) {
    let statusCode = 500;
    let message = "Internal server error";
  
    if (err.name === "UnauthorizedError") {
        statusCode = 401;
        message = "No token, authorization denied";
    } else if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Bad parameter";
    } else if (err.name === "NotFoundError") {
        statusCode = 404;
        message = "Not found";
    }
  
    res.status(statusCode).json({ msg: message });
}

app.use(errorHandlerMiddleware);
  