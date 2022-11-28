const PurchasedItem = require('../model/PurchasedItem');

const getAllPurchasedItems = async (req, res) => {
    const purchasedItems = await PurchasedItem.find();
    if (!purchasedItems) return res.status(204).json({ 'message': 'No item requests found.' });
    res.json(purchasedItems);
}

const createNewItemPurchase = async (req, res) => {
    if (!req?.body?.itemName|| !req?.body?.supplierName|| !req?.body?.price || !req?.body?.quantity || !req?.body?.companyName || !req?.body?.buyerName) {
        return res.status(400).json({ 'message': 'Item name is required' });
    }

    try {
        const result = await PurchasedItem.create({
            itemName: req.body.itemName,
            supplierName: req.body.supplierName,
            price: req.body.price,
            quantity: req.body.quantity,
            companyName: req.body.companyName,
            buyerName: req.body.buyerName,
            purchaseApproved: req.body.purchaseApproved
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateItemPurchase = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const purchasedItem = await PurchasedItem.findOne({ _id: req.body.id }).exec();
    if (!purchasedItem) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }
    if (req.body?.purchaseApproved) purchasedItem.purchaseApproved = req.body.purchaseApproved;
    const result = await purchasedItem.save();
    res.json(result);
}

const deleteItemPurchase = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const purchasedItem = await PurchasedItem.findOne({ _id: req.body.id }).exec();
    if (!purchasedItem) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }
    const result = await purchasedItem.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getItemPurchase = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const purchasedItem = await PurchasedItem.findOne({ _id: req.params.id }).exec();
    if (!purchasedItem) {
        return res.status(204).json({ "message": `No item matches ID ${req.params.id}.` });
    }
    res.json(purchasedItem);
}

module.exports = {
    getAllPurchasedItems,
    createNewItemPurchase,
    updateItemPurchase,
    deleteItemPurchase,
    getItemPurchase
}