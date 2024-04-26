const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlist.controller');

router.get('/:id', WishlistController.getWishlist);
router.post('/:id', WishlistController.addProductToWishlist);
router.delete('/:id', WishlistController.removeProductFromWishlist);

module.exports = router;
