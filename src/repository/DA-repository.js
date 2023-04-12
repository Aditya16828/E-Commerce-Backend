const CrudRepository = require('./crud-repository');
const DeliveryAgent = require('../models/deliveryAgent');

class DARepository extends CrudRepository{
    constructor(){
        super(DeliveryAgent);
    }
}

module.exports = DARepository;