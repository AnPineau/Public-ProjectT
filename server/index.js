const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const volleyball = require('volleyball');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const passport = require("passport");

const app = express();

if (process.env.NODE_ENV !== 'production') { // In DEV mode
	// CORS
	const cors = require('cors');
	app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
	// Dotenv
	require('dotenv').config()
}




// Database connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: "dev"
})
.then(res => {
	console.log(`Connected to db: ${uri}`);
})
.catch(err => {
	console.log(err.message);
});

// DB Session storage
const store = new MongoDBStore({
	uri: uri,
	databaseName: 'dev',
	collection: 'sessions'
});
store.on('error', function(error) {
	console.log(error);
});



// Middlewares
app.use(helmet());
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Auth handling
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: store
}));
app.use(passport.initialize());
app.use(passport.session());

const {auth} = require('./routes/api/auth');
app.use('/api/auth', auth);



// Routes imports
const tournois = require("./routes/api/tournois.js");
const users = require('./routes/api/users');
const { MongoStore } = require("connect-mongo");
const imageUpload = require('./routes/api/imageUpload');



// Routes usage
app.use("/api/tournois", tournois);
app.use('/api/users', users);
app.use('/api/images', imageUpload);



// Error handling
function notFound(req, res, next) {
	res.status(404);
	const error = new Error('Not Found - ' + req.originalUrl);
	next(error);
}

function errorHandler(err, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		message: err.message,
		stack: err.stack
	});
}

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV === 'production');
// Public folder (only in production mode)
if (process.env.NODE_ENV === 'production') {
	console.log('oui');
	// Static folder
	app.use(express.static(__dirname + '/public/'));
	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}



// Server starts
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
	if (process.env.NODE_ENV !== 'production')
		console.log('\x1b[33m%s\x1b[0m', `Server on: http://localhost:${port}/`);
});
