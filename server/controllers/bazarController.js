const BazarModel = require("../models/BazarModel");
const asyncHandler = require("express-async-handler");

// Controller functions

// Get all bazars
const getAllBazars = asyncHandler(async (req, res) => {
  const bazars = await BazarModel.find();
  res.status(200).json(bazars);
});

// Create a new bazar
const createBazar = asyncHandler(async (req, res) => {
  const bazar = new BazarModel(req.body);
  const newBazar = await bazar.save();
  res.status(201).json(newBazar);
});

// Get a single bazar
const getBazarById = asyncHandler(async (req, res) => {
  const bazar = await BazarModel.findById(req.params.id);
  if (bazar) {
    res.status(200).json(bazar);
  } else {
    res.status(404).json({ message: "Bazar not found" });
  }
});

// Update a bazar
const updateBazar = asyncHandler(async (req, res) => {
  const bazar = await BazarModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (bazar) {
    res.json(bazar);
  } else {
    res.status(404).json({ message: "Bazar not found" });
  }
});

// Delete a bazar
const deleteBazar = asyncHandler(async (req, res) => {
  const bazar = await BazarModel.findById(req.params.id);
  if (bazar) {
    await bazar.remove();
    res.status(200).json({ message: "Bazar deleted" });
  } else {
    res.status(404).json({ message: "Bazar not found" });
  }
});

// Export controller functions
module.exports = {
  getAllBazars,
  createBazar,
  getBazarById,
  updateBazar,
  deleteBazar,
};
