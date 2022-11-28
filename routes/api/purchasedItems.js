const express = require('express');
const router = express.Router();
const purchasedItemsController = require('../../controllers/purchasedItemsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(purchasedItemsController.getAllPurchasedItems)
    .post(verifyRoles(ROLES_LIST.Employee), purchasedItemsController.createNewItemPurchase)
    .put(verifyRoles(ROLES_LIST.Company), purchasedItemsController.updateItemPurchase)
    .delete(verifyRoles(ROLES_LIST.Employee), purchasedItemsController.deleteItemPurchase);

router.route('/:id')
    .get(purchasedItemsController.getItemPurchase);

module.exports = router;