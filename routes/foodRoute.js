const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.showFoodList);
router.get('/addFood', foodController.showAddFood);
router.get('/editFood/:foodId', foodController.showEditFood);
router.get('/foodDetails/:foodId', foodController.showFood);
router.post('/add', foodController.addFood);
router.post('/edit', foodController.updateFood);
router.get('/delete/:foodId', foodController.deleteFood);

module.exports = router;