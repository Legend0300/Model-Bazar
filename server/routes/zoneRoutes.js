const express = require('express');
const router = express.Router();
const Zone = require('../models/ZoneModel'); // Replace with the correct path

// Add Zone
router.post('/add-zone', async (req, res) => {
    try {
        const newZone = new Zone(req.body);
        const savedZone = await newZone.save();
        res.status(201).json(savedZone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Zones
router.get('/', async (req, res) => {
    try {
        const allZones = await Zone.find();
        res.json(allZones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Zone
router.delete('/delete-zone/:id', async (req, res) => {
    try {
        const deletedZone = await Zone.findByIdAndDelete(req.params.id);
        if (deletedZone) {
            res.json({ message: 'Zone deleted successfully', zone: deletedZone });
        } else {
            res.status(404).json({ message: 'Zone not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Zone
router.patch('/update-zone/:id', async (req, res) => {
    try {
        const updatedZone = await Zone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedZone) {
            res.json({ message: 'Zone updated successfully', zone: updatedZone });
        } else {
            res.status(404).json({ message: 'Zone not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
