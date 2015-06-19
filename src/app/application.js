var koa = require('koa');
var app = module.exports = koa();
var logger = require('koa-logger');
var views = require('co-views');
var path = require('path');

var render= views(path.join(__dirname, '../views'), { map: { html: 'swig' }});

app.use(logger());
//router
require('../routes')(app);

//404
app.use(function *pageNotFound(next) {
    this.body = yield render('404');
});

//error
app.on('error', function(err){
    console.log(err);
})

app.listen(3000, function(){
    console.log('app listen on port: 3000');
});