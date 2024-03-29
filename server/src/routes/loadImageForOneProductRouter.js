const express = require('express');
const router = express.Router();

const { loadImageForOneProductControllers, deleteImageForOneProductControllers } = require('../controllers/loadImageForOneProductControllers');

router.get('/:id', loadImageForOneProductControllers);
router.delete('/', deleteImageForOneProductControllers);

module.exports = router;
