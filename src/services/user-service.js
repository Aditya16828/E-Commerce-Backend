const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET_KEY} = require('../config/serverConfig');

const {UserRepository} = require('../repository/index');
const {
    PasswordMismatchError, 
    UserNotFoundError, 
    TokenVerificationError
} = require('../utils/errorHandlers/ClientErrors/index');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    createToken(user){
        try {
            const token = jwt.sign(user, SECRET_KEY, {expiresIn: '96h'});
            return token;
        } catch (error) {
            console.log("Error in token creation");
            console.log(error);
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, SECRET_KEY);
            return response;
        } catch (error) {
            if(error.name == 'JsonWebTokenError'){
                throw new TokenVerificationError();
            }
            console.log("Error in verifying Token");
            throw error;
        }
    }

    checkPassword(userPassword, encryptedPassword){
        try {
            const response = bcrypt.compareSync(userPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log("Error in Password Check");
            console.log(error);
            throw {error};
        }
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

            console.log(email, phoneNumber);

            let properties = {};
            if(email){
                properties['email'] = email[0];
            } else {
                properties['phoneNumber'] = phoneNumber[0];
            }

            const response = await this.userRepository.readbyProperties(properties);
            if(!response){
                let error = new UserNotFoundError();
                throw error;
            }

            const matchPassword = this.checkPassword(data['password'], response.password);

            if(!matchPassword){
                let error = new PasswordMismatchError();
                throw error;
            }

            const newtoken = this.createToken({
                id: response._id,
                email: response.email,
                phoneNumber: response.phoneNumber
            });
            return {token: newtoken, validity: "96 hrs"};
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteUser(userId, token){
        try {
            const user = await this.userRepository.read(userId);
            if(!user){
                let error = new UserNotFoundError();
                throw error;
            }

            let verificationResponse = this.verifyToken(token);
            if(!verificationResponse){
                let error = new TokenVerificationError();
                throw error;
            }

            await this.userRepository.remove(user._id);
            return true;
        } catch (error){
            throw error;
        }
    }

    async modifyUser(userId, data, token){
        try {
            const user = await this.userRepository.read(userId);
            if(!user){
                let error = new UserNotFoundError();
                throw error;
            }

            let verificationResponse = this.verifyToken(token);
            if(!verificationResponse){
                let error = new TokenVerificationError();
                throw error;
            }


            const response = await this.userRepository.update(userId, data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async authenticateUser(token){
        try {
            console.log(token);
            const response = this.verifyToken(token);

            const user = await this.userRepository.read(response.id);
            if(!user){
                throw new UserNotFoundError();
            }
            return user;
        } catch (error) {
            console.log("Error in Service Layer, cannot get the user id as per token");
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserService;