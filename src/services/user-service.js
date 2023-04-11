const {UserRepository} = require('../repository/index');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(data){
        try {
            const response = await this.userRepository.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getUser(data){
        try {
            const email = data['signinattr'].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            const phoneNumber = data['signinattr'].match(/^\+?[1-9][0-9]{7,14}$/g);

            // console.log(email, phoneNumber);

            let properties = {};
            if(email){
                properties['email'] = email[0];
            } else {
                properties['phoneNumber'] = phoneNumber[0];
            }

            properties['password'] = data['password'];

            const response = await this.userRepository.readbyProperties(properties);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUser(userId){
        try {
            const response = await this.userRepository.remove(userId);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async modifyUser(userId, data){
        try {
            const response = await this.userRepository.update(userId, data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserService;