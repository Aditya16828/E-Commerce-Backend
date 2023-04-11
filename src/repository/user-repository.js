const CrudRepository = require('./crud-repository');
const User = require('../models/user');

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async readbyProperties(properties){
        try {
            const response = await User.findOne(properties);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepository;