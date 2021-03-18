const express = require('express');
const router = express.Router();

const foodApiController = require('../../api/FoodAPI');

router.get('/', foodApiController.getFood);
router.get('/:foodId', foodApiController.getFoodById);
router.post('/', foodApiController.createFood);
router.put('/:foodId', foodApiController.updateFood);
router.delete('/:foodId', foodApiController.deleteFood);

module.exports = router;