const express = require('express');
const router = express.Router();
const feedingController = require('../controllers/feedingController');

router.get('/', feedingController.showFeedingList);
router.get('/addFeeding', feedingController.showAddFeeding);
router.get('/editFeeding/:feedingId', feedingController.showEditFeeding);
router.get('/feedingDetails/:feedingId', feedingController.showFeeding);
router.post('/add', feedingController.addFeeding);
router.post('/edit', feedingController.updateFeeding);
router.get('/delete/:feedingId', feedingController.deleteFeeding);

module.exports = router;