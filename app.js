 var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	
mongoose.connect("mongodb://localhost/MyLableing");

app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

var UserSchema = new mongoose.Schema({
    username: String,
});

var UserModel = mongoose.model('User', UserSchema); 
 
app.use(cookieParser('keyboard cat'));
app.use(bodyParser());



// …Ë÷√ Session
app.use(session({
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))


app.get("/", function(req, res) {
    if (req.session.user) {
        res.sendFile( __dirname + '/index.html');
    } else {
		res.redirect('/login');;
    }
});

app.get("/login", function (req, res) {
    res.render("login");
});

server.listen(3000);



function authenticate(name, fn) {
    if (!module.parent) console.log('authenticating %s', name);
    UserModel.findOne({
        username: name
    },
    function (err, user) {
        if (user) {
            if (err) return fn(new Error('cannot find user'));
				return fn(null, user);
        } else {
            return fn(new Error('cannot find user'));
        }
    });
}
	

app.post("/login", function (req, res) {
    authenticate(req.body.username, function (err, user) {
        if (user) {
            req.session.regenerate(function () {
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('/');
            });
        } else {
            var username = req.body.username;
			var user = new UserModel({
				username: username
			});
			user.save(function (err, newUser) {
				req.session.regenerate(function(){
					req.session.user = user;
					req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
					res.redirect('/');
				})
			});
        }
    });
});
