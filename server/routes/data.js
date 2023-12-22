const express = require('express');
const router = express.Router();


const data = require('../../db.json');
router.get('/', (req, res) => {
    console.log(data);
    res.json(data);
});

module.exports = router;


