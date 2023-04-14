const {OrderService} = require('../services/index');

const orderService = new OrderService();

const getOrderDetails = async (req, res) => {
    try {
        const token = req.headers["access-token"];
        const response = await orderService.getOrderDetails(req.params.id, token);
        return res.status(200).json({
            data: response,
            message: "Successfully fetched order",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Some problem occurred in fetching order",
            err: error,
            success: false
        });
    }
}

const placeOrder = async (req, res) => {
    try {
        const token = req.headers["access-token"];
        const response = await orderService.buyProduct(req.body, token);
        return res.status(200).json({
            data: response,
            message: "Successfully placed order",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Some problem occurred in placing order",
            err: error,
            success: false
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const token = req.headers["access-token"];
        const response = await orderService.cancelOrder(req.params.id, token);

        return res.status(200).json({
            data: response,
            message: "Successfully Cancelled order",
            err: {},
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            err: error,
            message: "Problem occurred in cancelling the order",
            success: false
        });
    }
};

module.exports = {
    getOrderDetails,
    placeOrder,
    cancelOrder
}