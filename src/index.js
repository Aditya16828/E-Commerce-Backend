const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig.js');
const connect = require('./config/database.js');
const ApiRoutes = require("./routes/index");

const setupandrunserver = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/api/", ApiRoutes);

    app.listen(PORT, async () => {
        console.log("Server Started at", PORT);
        await connect();
        console.log('MongoDB server connected');
    });
}

setupandrunserver();