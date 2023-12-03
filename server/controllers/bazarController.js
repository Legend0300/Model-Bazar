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
   try{
    const bazar = await BazarModel.findByIdAndUpdate(req.params.id , req.body , {new : true});
    if (bazar) {
      res.json(bazar);
    } else {
      res.status(404).json({ message: 'Bazar not found' });
    }
}
    catch (error) {
      res.status(500).json({ message: error.message });
    }
}

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
