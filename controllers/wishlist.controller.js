const Wishlist = require('../models/wishlist.model');

const getWishlist = async (req, res) => {
    Wishlist.findById(req.params.userId) // assuming the userId is the id of the wishlist
        .then(wishlist => {
            if(!wishlist) {
                return res.status(404).send({
                    message: "Wishlist not found for user id " + req.params.userId
                });            
            }
            res.send(wishlist);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Wishlist not found for user id " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving wishlist for user id " + req.params.userId
            });
        });
};

const addProductToWishlist = async (req, res) => {
    Wishlist.updateOne(
        { _id: req.params.userId }, 
        { $push: { products: req.params.productId } } // assuming the products in the wishlist are stored in an array
    )
    .then(wishlist => {
        if(!wishlist) {
            return res.status(404).send({
                message: "Wishlist not found for user id " + req.params.userId
            });
        }
        res.send(wishlist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Wishlist not found for user id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error adding product to wishlist for user id " + req.params.userId
        });
    });
};

const removeProductFromWishlist = async (req, res) => {
    Wishlist.updateOne(
        { _id: req.params.userId }, 
        { $pull: { products: req.params.productId } } // assuming the products in the wishlist are stored in an array
    )
    .then(wishlist => {
        if(!wishlist) {
            return res.status(404).send({
                message: "Wishlist not found for user id " + req.params.userId
            });
        }
        res.send({ message: "Product removed from wishlist successfully!" });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Wishlist not found for user id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not remove product from wishlist for user id " + req.params.userId
        });
    });
};

module.exports = {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
};
