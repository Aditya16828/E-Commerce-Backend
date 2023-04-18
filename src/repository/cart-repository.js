const Cart = require('../models/cart');
const CrudRepository = require('./crud-repository');

class CartRepository extends CrudRepository {
    constructor(){
        super(Cart);
    }

    async getByUserid(userid){
        try {
            const response = await Cart.findOne({
                "userId": userid
            }).populate('items');
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CartRepository;