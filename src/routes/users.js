const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser, updateUser, getUser, getUserByName} = require('../controllers/users.controller');

router.route('/')
    .get(getUsers)
    .get(getUserByName)
    .post(createUser)
    .put(updateUser);

router.route('/byname')
    .get(getUserByName)

router.route('/:id')
    .get(getUser)
    .delete(deleteUser);

module.exports = router;