const {UserService} = require('../services/index');

const userService = new UserService();

const signup = async (req, res) => {
    try {
        const response = await userService.createUser(req.body);
        return res.status(200).json({
            data: response,
            message: "Signup Successfull",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Some Error occurred while signup, plz try again",
            err: error,
            success: false
        });
    }
}

const signin = async (req, res) => {
    try {
        const response = await userService.getUser(req.body);
        console.log(response);

        return res.status(200).json({
            data: response,
            message: "Successfully signed in",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot sign you in",
            err: error,
            success: false
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const token = req.headers["access-token"];
        const response = await userService.deleteUser(req.params.id, token);
        return res.status(200).json({
            data: response,
            message: "Successfully deleted User",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot delete User",
            err: error,
            success: false
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const token = req.headers["access-token"];
        const response = await userService.modifyUser(req.params.id, req.body, token);
        return res.status(200).json({
            data: response,
            message: "Successfully updated User",
            err: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot update User",
            err: error,
            success: false
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers["access-token"];
        const response = await userService.authenticateUser(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User Authenticated",
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot authenticate User",
            err: error,
            success: false
        });
    }
};

module.exports = {
    signup,
    signin,
    deleteUser,
    updateUser,
    isAuthenticated
}