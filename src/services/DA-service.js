const {DARepository} = require('../repository/index');

class DAService {
    constructor(){
        this.daRepository = new DARepository();
    }

    async createDA(data){
        try {
            const response = await this.daRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getDA(daId){
        try {
            const response = await this.daRepository.read(daId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getDAs(properties, offset, limit){
        try {
            const response = await this.daRepository.readAll(offset, limit, properties);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteDA(daId){
        try {
            const response = await this.daRepository.remove(daId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async modifyDA(daId, data){
        try {
            const response = await this.daRepository.update(daId, data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addDelivery(daid, orderid){
        try {
            const response = await this.daRepository.addDelivery(daid, orderid);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = DAService;