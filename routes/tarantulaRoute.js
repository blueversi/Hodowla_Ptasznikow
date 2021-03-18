const express = require('express');
const router = express.Router();
const tarantulaController = require('../controllers/tarantulaController');

router.get('/', tarantulaController.showTarantulaList);
router.get('/addTarantula', tarantulaController.showAddTarantula);
router.get('/editTarantula/:tarantulaId', tarantulaController.showEditTarantula);
router.get('/tarantulaDetails/:tarantulaId', tarantulaController.showTarantula);
router.post('/add', tarantulaController.addTarantula);
router.post('/edit', tarantulaController.updateTarantula);
router.get('/delete/:tarantulaId', tarantulaController.deleteTarantula);

module.exports = router;