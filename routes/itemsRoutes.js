const express = require('express');
const itemController = require('../controllers/itemControllers');
const requireLogin = require('../utils/authMiddleware');

const router = express.Router();

// CRUD operations for items (protected by login middleware)
router.post('/items', requireLogin, itemController.createItem);
router.get('/items', requireLogin, itemController.getAllItems);
router.get('/items/:id', requireLogin, itemController.getItemById);
router.put('/items/:id', requireLogin, itemController.updateItem);
router.delete('/items/:id', requireLogin, itemController.deleteItem);

module.exports = router;
