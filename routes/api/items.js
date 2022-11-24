const express = require('express');
const router = express.Router();
const itemRequestsController = require('../../controllers/itemController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(itemRequestsController.getAllItems)
    .post(verifyRoles(ROLES_LIST.Supplier), itemRequestsController.createNewItem)
    .put(verifyRoles(ROLES_LIST.Supplier), itemRequestsController.updateItem)
    .delete(verifyRoles(ROLES_LIST.Supplier), itemRequestsController.deleteItem);

router.route('/:id')
    .get(itemRequestsController.getItem);

module.exports = router;