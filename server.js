// Main starting point of the server application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./routes/router');

/*
	Database Setup
*/
mongoose.set('debug',true)
mongoose.connect('mongodb://localhost:auth/auth');

/*
	App Setup
	- Setup the application
*/
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
app.use(cors());
router(app);


/*
	Server Setup
	- Will allow the application to communicate with others
*/
const port = process.env.PORT || 3090
const server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
})