//middleware is to correct any errors between req and res 
const errorMiddlewareHandler = (err, req, res, next) => {
    // set status code 
    const errorStatusCode = res.statusCode === 200? 500 : res.statusCode;
    res.status(errorStatusCode);
    //send error to user describing err
    res.json({
        message: err.message,
    });


};

module.exports = { errorMiddlewareHandler} ;