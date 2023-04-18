const CrudRepository = require('./crud-repository');
const DeliveryAgent = require('../models/deliveryAgent');

class DARepository extends CrudRepository{
    constructor(){
        super(DeliveryAgent);
    }

    async addDelivery(daid, orderid){
        try {
            const da = await DeliveryAgent.findById(daid);
            da.orderDeliveries.push(orderid);
            da.save();
            return da;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = DARepository;