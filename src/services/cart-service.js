const { CartRepository, ProductRepository } = require('../repository/index');

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    async getCart(userid){
        try {
            const cart = await this.cartRepository.getByUserid(userid);
            return cart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async manageCart(userid, productid, quantity) {
        try {
            const cart = await this.cartRepository.getByUserid(userid);
            const product = await this.productRepository.read(productid);

            console.log("------------------------------------------", cart);
            
            if (cart) {
                const productIndex = cart.items.findIndex((item) => item.productId == productid);
                
                if (productIndex > -1) { // product is already present in cart
                    let cartProduct = cart.items[productIndex];
                    
                    cartProduct.quantity += quantity;
                    cart.totalAmount = cart.items.reduce((acc, curr) => {
                        return acc + curr.quantity * product.price;
                    }, 0);

                    cart.items[productIndex] = cartProduct;
                    
                    await cart.save();
                    return cart;
                } else {
                    cart.items.push({ 
                        "productId": product.id,
                        "quantity": quantity 
                    });
                    cart.totalAmount = cart.items.reduce((acc, curr) => {
                        return acc + (curr.quantity * product.price);
                    }, 0)
                    
                    await cart.save();
                    return cart;
                }
            } else {
                const newCart = await this.cartRepository.create({
                    "userId": userid,
                    "items": [{ 
                        "productId": product.id,
                        "quantity": quantity 
                    }],
                    "totalAmount": quantity * product.price,
                });

                return newCart;
            } 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async checkout(){
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = CartService;