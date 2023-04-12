const {ProductRepository} = require('../repository/index');

class ProductService {
    constructor(){
        this.productRepository = new ProductRepository();
    }

    async createProduct(data){
        try {
            const response = await this.productRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProduct(productId){
        try {
            const response = await this.productRepository.read(productId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProducts(properties, offset, limit){
        try {
            const response = await this.productRepository.readAll(offset, limit, properties);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteProduct(productId){
        try {
            const response = await this.productRepository.remove(productId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async modifyProduct(productId, data){
        try {
            const response = await this.productRepository.update(productId, data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductService;