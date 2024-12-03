module.exports = (app) => {

    app.use((error, req, res, next) => {
        const statusCode = error.status || 500;

        return res.status(statusCode).send({
            code: 'Exception',
            reason: error.message
        });
    }); 
}