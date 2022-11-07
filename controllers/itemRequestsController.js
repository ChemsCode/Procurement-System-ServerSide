const ItemRequest = require('../model/ItemRequest');

const getAllItemRequests = async (req, res) => {
    const itemRequests = await ItemRequest.find();
    if (!itemRequests) return res.status(204).json({ 'message': 'No item requests found.' });
    res.json(itemRequests);
}

const createNewItemRequest = async (req, res) => {
    if (!req?.body?.itemName) {
        return res.status(400).json({ 'message': 'Item name is required' });
    }

    try {
        const result = await ItemRequest.create({
            itemName: req.body.itemName,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateItemRequest = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const itemRequest = await ItemRequest.findOne({ _id: req.body.id }).exec();
    if (!itemRequest) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }
    if (req.body?.itemName) itemRequest.itemName = req.body.itemName;
    const result = await itemRequest.save();
    res.json(result);
}

const deleteItemRequest = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const itemRequest = await ItemRequest.findOne({ _id: req.body.id }).exec();
    if (!itemRequest) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }
    const result = await itemRequest.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getItemRequest = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const itemRequest = await ItemRequest.findOne({ _id: req.params.id }).exec();
    if (!itemRequest) {
        return res.status(204).json({ "message": `No item matches ID ${req.params.id}.` });
    }
    res.json(itemRequest);
}

module.exports = {
    getAllItemRequests,
    createNewItemRequest,
    updateItemRequest,
    deleteItemRequest,
    getItemRequest
}