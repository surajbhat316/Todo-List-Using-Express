const express = require('express');

const router = express.Router();

const homePageController = require('../controllers/home_page_controller');
router.use(express.urlencoded({extended: true}));

router.get('/',homePageController.homePage);
router.post('/create-task', homePageController.createTask);

router.get('/update-task', homePageController.updateTask);

router.get('/delete-task', homePageController.deleteTasks);

module.exports = router;