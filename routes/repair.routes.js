const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { validIfExistRepair } = require('../middlewares/repair.middleware');
const { validateFields } = require('../middlewares/validateFields.middleware');

const router = Router();

router.get('/', findAllRepairs);

router.get('/:id', validIfExistRepair, findOneRepair);

router.post('/',
[
  check('date', 'The date is mandatory').not().isEmpty(),
  check('motorsNumber', 'The motorsNumber is mandatary').not().isEmail(),
  check('description', 'The date is mandatory').not().isEmpty(),
  validateFields
], 
createRepair);

router.patch('/:id',
validIfExistRepair, updateRepair);

router.delete('/:id', validIfExistRepair, deleteRepair);

module.exports = {
  repairRouter: router,
};
