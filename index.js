const express = require('express');

const app = express();
const port = 8000;


const db = require('./config/mongoose');
const Tasks = require('./models/tasks');

// User Express router
app.use('/', require('./routes/index'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./assets'));

app.listen(port, function(err){
    if(err){
        console.log("Error "+ err);
        return;
    }
    console.log(`listening on ${port}`);
})

