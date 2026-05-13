const express = require('express');

const { ServerConfig, Logger } = require('./config/index.js');
const apiRoutes = require('./routes/index.js');
const { ConnectDataBase } = require('./db/index.js');
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const GlobalErrorhandler = require("./utils/error-handler.js")
const morgan = require('morgan') // to log api in terminal
const mongoose = require("mongoose")

require("dotenv").config()

const app = express();


// ----------------- DATABASE ENTRY  -----------------//
ConnectDataBase()
// ----------------- DATABASE ENTRY  -----------------//


// mongoose.set("debug" , true)


// ----------------- MIDDELWARES -----------------//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// ----------------- MIDDELWARES -----------------//



// ----------------- Morgan for Api log endPoint -----------------//
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))
// ----------------- Morgan for Api log endPoint -----------------// 


// ----------------- ALL ROUTES -----------------//
app.use("/mba/api", apiRoutes)
// ----------------- ALL ROUTES -----------------// 






 

app.get("/", (req, res) => {
    res.send("Welcome to Node Starter Template")
})


// ----------------- SERVER RUNNING -----------------//
app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // Logger.info("Successfully started " , {}) // you can enable to log the messages
});


 
// ----------------- SERVER RUNNING -----------------//


// ----------------- GLOBAL ERROR HANDLER -----------------//
app.use(GlobalErrorhandler)
// ----------------- GLOBAL ERROR HANDLER -----------------//

