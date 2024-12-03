const express = require('express');
const router = express.Router();
const controller = require('../controllers/users') 

router.get('/', controller.usersList);
router.get('/:username/stats', controller.userStats);
router.get('/:username/activities', controller.userActivities);
router.get('/:username/achievements', controller.userAchievements);
router.get('/:username', controller.userById);
router.post('/notif', controller.sendNotif);
router.post('/report', controller.generateReport);

module.exports = router;