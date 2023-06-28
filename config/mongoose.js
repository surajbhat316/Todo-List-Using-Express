// require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/tasks_list');

// acquire the connection to see if it is successfull
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print this message
db.once('open', function(){
    console.log("Successfully Connected to database");
});