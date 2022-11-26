const express = require('express');
const router = express.Router();
const itemController= require('../../controllers/itemController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(itemController.getAllItems)
    .post(verifyRoles(ROLES_LIST.Supplier), itemController.createNewItem)
    .put(verifyRoles(ROLES_LIST.Supplier), itemController.updateItem)
    .delete(verifyRoles(ROLES_LIST.Supplier), itemController.deleteItem);

router.route('/:id')
    .get(itemController.getItem);

module.exports = router;