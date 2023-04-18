const {DAService} = require('../services/index');

const daService = new DAService();

const createDA = async (req, res) => {
    try {
        const response = await daService.createDA(req.body);
        return res.status(200).json({
            data: response,
            message: "Successfully created DA",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot create DA",
            err: error,
            success: false
        });
    }
}

const getDA = async (req, res) => {
    try {
        const response = await daService.getDA(req.params.id);
        return res.status(200).json({
            data: response,
            message: "Successfully fetched DA",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot fetch DA",
            err: error,
            success: false
        });
    }
}

const getDAs = async (req, res) => {
    try {
        const response = await daService.getDAs(req.body, req.query.offset, req.query.limit);
        return res.status(200).json({
            data: response,
            message: "Successfully fetched DAs",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot fetch DAs",
            err: error,
            success: false
        });
    }
}

const deleteDA = async (req, res) => {
    try {
        const response = await daService.deleteDA(req.params.id);
        return res.status(200).json({
            data: response,
            message: "Successfully deleted DA",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot delete DA",
            err: error,
            success: false
        });
    }
}

const updateDA = async (req, res) => {
    try {
        const response = await daService.modifyDA(req.params.id, req.data);
        return res.status(200).json({
            data: response,
            message: "Successfully updated DA",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot update DA",
            err: error,
            success: false
        });
    }
}

const addDelivery = async (req, res) => {
    try {
        const response = await daService.addDelivery(req.body.daid, req.body.orderid);
        return res.status(200).json({
            data: response,
            message: "Successfully added Delivery",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot add Delivery",
            err: error,
            success: false
        });
    }
}

module.exports = {
    createDA,
    getDA,
    getDAs,
    updateDA,
    deleteDA,
    addDelivery
}