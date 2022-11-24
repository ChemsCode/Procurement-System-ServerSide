const Item = require('../model/Item');

const getAllItems = async (req, res) => {
    const items = await Item.find();
    if (!items) return res.status(204).json({ 'message': 'No items found.' });
    res.json(items);
}

const createNewItem = async (req, res) => {
    if (!req?.body?.itemName || !req?.body?.supplierName ||!req?.body?.price) {
        return res.status(400).json({ 'message': 'Item name, supplier name and Price required' });
    }

    try {
        const result = await Item.create({
            itemName: req.body.itemName,
            supplierName: req.body.supplierName,
            price: req.body.price,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateItem = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const item = await Item.findOne({ _id: req.body.id }).exec();
    if (!item) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.itemName) item.itemName = req.body.itemName;
    if (req.body?.supplierName) item.supplierName = req.body.supplierName;
    if (req.body?.price) item.price = req.body.price;
    const result = await item.save();
    res.json(result);
}

const deleteItem = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const item = await Item.findOne({ _id: req.body.id }).exec();
    if (!item) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }
    const result = await item.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getItem = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const item = await Item.findOne({ _id: req.params.id }).exec();
    if (!item) {
        return res.status(204).json({ "message": `No item matches ID ${req.params.id}.` });
    }
    res.json(item);
}

module.exports = {
    getAllItems,
    createNewItem,
    updateItem,
    deleteItem,
    getItem
}