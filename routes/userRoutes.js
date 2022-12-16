const express = require('express');
const {
	getUser,
	createUser,
	getUsers,
	updateUser,
	deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
