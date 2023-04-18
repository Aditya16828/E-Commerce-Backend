const {OrderRepository} = require('../repository/index');
const UserService = require('./user-service');
const DAService = require('./DA-service');
const ProductService = require('./product-service');
const {KEY_ID, KEY_SECRET} = require('../config/serverConfig');


class OrderService {
    constructor(){
        this.orderRepository = new OrderRepository();
        this.userService = new UserService();
        this.daService = new DAService();
        this.productService = new ProductService();
    }

    async getOrderDetails(orderId, token){
        try {
            const user = await this.userService.authenticateUser(token);

            const order = await this.orderRepository.read(orderId);
            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async buyProduct(data, token){
        try {
            const user = await this.userService.authenticateUser(token);

            const payload = {
                'productId': data.productId,
                'userId': user._id
            }

            if(data.deliveryType){
                payload['deliveryType'] = data['deliveryType'];
            }

            const product = await this.productService.getProduct(data.productId);

            // payment setup
            const instance = new Razorpay({
                key_id: KEY_ID,
                key_secret: KEY_SECRET
            });
    
            const paymentOrder = await instance.orders.create({
                amount: amount,
                currency: "INR",
                receipt: "receipt#1"
            });

            // redirection to a page -> completion of payment -> capture payment details ("status" == "captured")

            if(payment){
                payload['status'] = 'Placed';
                // also update transactionid
            } else {
                payload['status'] = 'Pending';
            }

            const order = await this.orderRepository.create(payload);

            user.orders.push(order._id);
            user.save();

            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async cancelOrder(orderId, token){
        // to cancel order, we need to update 'status' to 'Cancelled'.
        try {
            const user = this.userService.authenticateUser(token);

            const payload = {
                'status': 'Cancelled'
            };

            const order = await this.orderRepository.update(orderId, payload);
            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async onDelivery(orderId){
        try {
            const payload = {
                'status': 'Delivered'
            };

            const order = await this.orderRepository.update(orderId, payload);
            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addDA(orderId, daId){
        try {           
            const payload = {
                'daId': daId
            };

            const da = await this.daService.addDelivery(daId, orderId);

            const order = await this.orderRepository.update(orderId, payload);
            return {order, da};
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = OrderService;