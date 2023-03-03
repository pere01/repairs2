const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateFields.middleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', validIfExistUser, findOneUser); 

router.post('/',[
  check('name', 'The name is mandatory').not().isEmpty(),
  check('email', 'The email is mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password is mandatory').not().isEmpty(),
  validateFields,
],
createUser
);

router.patch('/:id',
[
  check('name', 'The name is mandatory').not().isEmpty(),
  check('email', 'The email is mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  validateFields
], validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  userRouter: router,
};
