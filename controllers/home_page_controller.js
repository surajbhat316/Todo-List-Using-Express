const db = require('../config/mongoose');
const Tasks = require('../models/tasks');

module.exports.homePage = function(req,res) {
    getAllTheTasks(req,res);
}

async function getAllTheTasks(req,res){
    let data = await Tasks.find({});
    let filteredData = [];
    filteredData = getFilterData(data);
    console.log(filteredData);
    return res.render('homePage', {
        title: "To Do List",
        tasks : filteredData,
    });
}

function getFilterData(data){
    let filteredData = [];
    for(let item of data){
        let obj = {};
        obj._id = item._id;
        obj.task_name = item.task_name;
        obj.isCompleted = item.isCompleted;
        obj.category = item.category;
        obj.due_date = item.due_date.toDateString();
        filteredData.push(obj);
    }
    return filteredData;
}

module.exports.createTask = function(req, res) {
    console.log(req.body);
    Tasks.create({
        task_name: req.body.task_name,
        category: req.body.category,
        due_date: req.body.date
    });
    return res.redirect('/');
}

module.exports.updateTask = function(req,res){
    updateTheTask(req,res);
    return res.redirect('/');
}

async function updateTheTask(req, res){
    let val = await Tasks.find({_id : req.query.id});
    if(val[0].isCompleted){
        val[0].isCompleted = false;
        await Tasks.findOneAndUpdate({_id: val[0]._id}, {isCompleted : val[0].isCompleted}, {new : true});
    } 
    else{
        val[0].isCompleted = true;
        await Tasks.findOneAndUpdate({_id: val[0]._id}, {isCompleted : val[0].isCompleted}, {new : true});
    }
}


module.exports.deleteTasks = function(req,res){
    
    console.log("Enters deleted tasks");
    deleteAllCompletedTasks(req,res);
}

async function deleteAllCompletedTasks(req,res){
    let val = await Tasks.deleteMany({isCompleted : true});
    if(val.deletedCount === 0){
        return res.redirect('/');
    }
    let data = await Tasks.find({});
    let filteredData = [];
    filteredData = getFilterData(data);
    return res.render('homePage', {
        title: "To Do List",
        tasks : filteredData,
    });
}
