const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

// Lấy danh sách từ và tìm kiếm
router.get('/', wordController.getAllWords);
router.get('/search', wordController.searchWord);

// CRUD operations
router.get('/:id', wordController.getWordById);
router.post('/', wordController.createWord);
router.put('/:id', wordController.updateWord);
router.delete('/:id', wordController.deleteWord);

module.exports = router; 