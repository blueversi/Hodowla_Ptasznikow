const express = require('express');
const router = express.Router();

const tarantulaApiController = require('../../api/TarantulaAPI');

router.get('/', tarantulaApiController.getTarantula);
router.get('/:tarantulaId', tarantulaApiController.getTarantulaById);
router.post('/', tarantulaApiController.createTarantula);
router.put('/:tarantulaId', tarantulaApiController.updateTarantula);
router.delete('/:tarantulaId', tarantulaApiController.deleteTarantula);

module.exports = router;