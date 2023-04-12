const {DAService} = require('../services/index');

const daService = new DAService();

const createDA = async (req, res) => {
    try {
        const response = await daService.createDA(req.body);
        return res.status(200).json({
            data: response,
            message: "Successfully created Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot create Product",
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
            message: "Successfully fetched Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot fetch Product",
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
            message: "Successfully fetched Products",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot fetch Products",
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
            message: "Successfully deleted Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot delete Product",
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
            message: "Successfully updated Product",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot update Product",
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
    deleteDA
}