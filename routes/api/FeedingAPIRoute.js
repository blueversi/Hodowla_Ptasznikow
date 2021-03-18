const express = require('express');
const router = express.Router();

const feedingApiController = require('../../api/FeedingAPI');

router.get('/', feedingApiController.getFeeding);
router.get('/:feedingId', feedingApiController.getFeedingById);
router.post('/', feedingApiController.createFeeding);
router.put('/:feedingdId', feedingApiController.updateFeeding);
router.delete('/:feedingId', feedingApiController.deleteFeeding);

module.exports = router;