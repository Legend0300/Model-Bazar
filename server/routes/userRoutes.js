//userRoutes
const express = require('express');
const router = express.Router();
const { getUsers, getUserById, addUser, deleteUser, updateUser } = require('../controllers/userController');
const middleware = require('../middleware/test');  // Update this line

router.post('/test' , middleware(["ahmed" , "abdullah"]) ,(req, res) => {
    res.send('Hello from userRoutes');
});

router.get('/', getUsers)

router.get('/get-user/:id', getUserById);

router.post('/add-user', addUser);

router.delete('/delete-user/:id', deleteUser);

router.patch('/update-user/:id', updateUser);


module.exports = router;
