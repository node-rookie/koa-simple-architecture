var koa = require('koa');
var app = module.exports = koa();
var logger = require('koa-logger');
var views = require('co-views');
var path = require('path');
var staticServer = require('koa-static');


var render= views(path.join(__dirname, '../views'), { map: { html: 'swig' }});

app.use(logger());
//router
require('../routes')(app);

app.use(function *() {
    switch (this.path) {
        case '/get':
            get.call(this);
            break;
        case '/remove':
            remove.call(this);
            break;
        case '/regenerate':
            yield regenerate.call(this);
            break;
    }
});

function get() {
    var session = this.session;
    session.count = session.count || 0;
    session.count++;
    this.body = session.count;
}

function remove() {
    this.session = null;
    this.body = 0;
}

function *regenerate() {
    get.call(this);
    yield this.regenerateSession();
    get.call(this);
}
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