const {ProductService} = require('../services/index');

const productService = new ProductService();

const createProduct = async (req, res) => {
    try {
        const response = await productService.createProduct(req.body);
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

const getProduct = async (req, res) => {
    try {
        const response = await productService.getProduct(req.params.id);
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

const getProducts = async (req, res) => {
    try {
        const response = await productService.getProducts(req.body, req.query.offset, req.query.limit);
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

const deleteProduct = async (req, res) => {
    try {
        const response = await productService.deleteProduct(req.params.id);
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

const updateProduct = async (req, res) => {
    try {
        const response = await productService.modifyProduct(req.params.id, req.data);
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
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct
}