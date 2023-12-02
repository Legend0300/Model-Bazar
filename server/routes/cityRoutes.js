
const express = require('express');
const router = express.Router();
const CityModel = require('../models/CityModel');
const cityController = require('../controllers/cityController');

// GET all cities
router.get('/', cityController.getAllCities);

// GET a specific city
router.get('/:id', cityController.getCityById);

// POST a new city
router.post('/', cityController.createCity);

// PATCH an existing city
router.patch('/:id', cityController.updateCity);

// DELETE a city
router.delete('/:id', cityController.deleteCity);

module.exports = router;
