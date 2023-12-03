const express = require('express');
const router = express.Router();
const { getZones, getZoneById, createZone, deleteZoneById, updateZoneById } = require('../controllers/zoneController');


router.get('/', getZones);

router.get('/get-zone/:id', getZoneById);

router.post('/add-zone',  createZone);

router.delete('/delete-zone/:id', deleteZoneById);

router.patch('/update-zone/:id', updateZoneById);

module.exports = router;
