const BazarModel = require('../models/BazarModel');

// Controller functions

// Get all bazars
const getAllBazars = async (req, res) => {
    try {
        const bazars = await BazarModel.find();
        res.status(200).json(bazars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new bazar
const createBazar = async (req, res) => {
    const bazar = new BazarModel(req.body);

    try {
        const newBazar = await bazar.save();
        res.status(201).json(newBazar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single bazar
const getBazarById = async (req, res) => {
    try {
        const bazar = await BazarModel.findById(req.params.id);
        if (bazar) {
            res.status(200).json(bazar);
        } else {
            res.status(404).json({ message: 'Bazar not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a bazar
const updateBazar = async (req, res) => {
    try {
        const bazar = await BazarModel.findById(req.params.id);
        if (bazar) {
            bazar.name = req.body.name || bazar.name;
            bazar.address = req.body.address || bazar.address;
            bazar.city = req.body.city || bazar.city;
            bazar.zone = req.body.zone || bazar.zone;
            bazar.active = req.body.active || bazar.active;
            bazar.approvedShops = req.body.approvedShops || bazar.approvedShops;
            bazar.baseRentPermanent = req.body.baseRentPermanent || bazar.baseRentPermanent;
            bazar.prefix = req.body.prefix || bazar.prefix;
            bazar.image = req.body.image || bazar.image;
            bazar.zoneManager = req.body.zoneManager || bazar.zoneManager;
            bazar.bazarManager = req.body.bazarManager || bazar.bazarManager;
            bazar.supervisor = req.body.supervisor || bazar.supervisor;

            const updatedBazar = await bazar.save();
            res.status(200).json(updatedBazar);
        } else {
            res.status(404).json({ message: 'Bazar not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a bazar
const deleteBazar = async (req, res) => {
    try {
        const bazar = await BazarModel.findById(req.params.id);
        if (bazar) {
            await bazar.remove();
            res.status(200).json({ message: 'Bazar deleted' });
        } else {
            res.status(404).json({ message: 'Bazar not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export controller functions
module.exports = {
    getAllBazars,
    createBazar,
    getBazarById,
    updateBazar,
    deleteBazar,
};
