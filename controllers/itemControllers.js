const Item = require('../models/items');

// Create a new item
exports.createItem = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id; // Decoded from JWT

    try {
        const item = await Item.create({ name, description, userId });
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating item');
    }
};

// Get all items for the logged-in user
exports.getAllItems = async (req, res) => {
    const userId = req.user.id; // Decoded from JWT

    try {
        const items = await Item.findAll({ where: { userId } });
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching items');
    }
};

// Get a specific item by id
exports.getItemById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Decoded from JWT

    try {
        const item = await Item.findOne({ where: { id, userId } });
        if (!item) return res.status(404).send('Item not found');
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching item');
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id; // Decoded from JWT

    try {
        const item = await Item.findOne({ where: { id, userId } });
        if (!item) return res.status(404).send('Item not found');

        item.name = name;
        item.description = description;
        await item.save();

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating item');
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Decoded from JWT

    try {
        const item = await Item.findOne({ where: { id, userId } });
        if (!item) return res.status(404).send('Item not found');

        await item.destroy();
        res.status(200).send('Item deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting item');
    }
};
