module.exports = function(app){
    app.use('/heartbeat', function(req, res){
        res.status(200).end();
    });
};