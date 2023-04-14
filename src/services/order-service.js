const {OrderRepository} = require('../repository/index');
const UserService = require('./user-service');

class OrderService {
    constructor(){
        this.orderRepository = new OrderRepository();
        this.userService = new UserService();
    }

    async getOrderDetails(orderId, token){
        try {
            const user = await this.userService.authenticateUser(token);

            const order = await this.orderRepository.read(productId);
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

            // payment setup
            const payment = true;

            if(payment){
                // register a payment id in order DB, and also in payments DB (not sure yet about payment DB as it can be replaced by transaction id)
                payload['status'] = 'Placed';
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

            const order = this.orderRepository.update(orderId, payload);
            return order;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeOrder(orderId){
        try {
            
        } catch (error) {
            
        }
    }

    async onDelivery(orderId){
        try {
            
        } catch (error) {
            
        }
    }

    async addDA(){}
}

module.exports = OrderService;