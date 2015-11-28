 var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	//mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	path = require('path'),
	fs = require('fs'),
	flash = require('connect-flash');
//var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/MyLableing");

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



 
app.use(cookieParser('keyboard cat'));
app.use(bodyParser());
var routes = require('./routes/index');

var reg = require('./routes/reg');
app.use('/reg', reg);
app.use(flash());
// 设置 Session
app.use(session({
  store: new RedisStore({
    host: "127.0.0.1",
    port: 6379,
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

app.use('/', routes);
app.use(function(req, res, next){
  console.log("app.usr local");
  res.locals.user = req.session.user;
  res.locals.post = req.session.post;
  var error = req.flash('error');
  res.locals.error = error.length ? error : null;
 
  var success = req.flash('success');
  res.locals.success = success.length ? success : null;
  next();
});
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


app.post("/init", function (req, res) {
		console.log('init');
        if (req.session.user) {
			 console.log(modelListString);  
			res.send(modelListString); 
        } else {
            res.redirect('/');
        }

});

var modelListString;


fs.readdir("./public/models/", function (err, files) {//读取文件夹下文件  
    var count = files.length; 
    var modelList = new Array() ;  
    files.forEach(function (filename) {  
        fs.readFile(filename, function (data) {  
            var tmpResult={};  
            tmpResult["modelName"]=filename;  
            tmpResult["thumbPath"] = "/models/"+filename+"/"+filename+".png";  
            modelList[count-1]=tmpResult ;  
            count--;  
            if (count <= 0) {  
				modelListString = JSON.stringify(modelList)
            }  
        });  
    });  
}); 



