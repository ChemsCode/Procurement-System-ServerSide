const express = require('express');
const router = express.Router();
const itemRequestsController = require('../../controllers/itemRequestsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(itemRequestsController.getAllItemRequests)
    .post(verifyRoles(ROLES_LIST.Employee), itemRequestsController.createNewItemRequest)
    .put(verifyRoles(ROLES_LIST.Employee, ROLES_LIST.Supplier), itemRequestsController.updateItemRequest)
    .delete(verifyRoles(ROLES_LIST.Employee), itemRequestsController.deleteItemRequest);

router.route('/:id')
    .get(itemRequestsController.getItemRequest);

module.exports = router;