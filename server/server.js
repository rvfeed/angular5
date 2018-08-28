import express from 'express';
import bodyParser from 'body-parser';
import  config  from './config';
import  connectMongo  from './db/connectDb';
import proutes from "./routes" ;
import bcrypt from 'bcryptjs';
import TokenLib from './lib/tokenGen';
import jwt from 'jsonwebtoken';
import cookieparser from 'cookie-parser';
import test from './schema';

const app = express();
//app.use(express.static("static"));
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(cors({credentials: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "hello, Content-Type, Origin, Accept, x-access-token, X-XSRF-TOKEN");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "application/json");
    next(); 
});
const exclude = ["login", "register"];
app.use((req, res, next) => {
    const exUrl = req.originalUrl.split("/").filter( r => r != "")[0];
    if(exclude.indexOf(exUrl) > -1 || req.method == "OPTIONS") next();
    else{
        console.log(req.originalUrl);
        const tokenObj = new TokenLib();
        tokenObj
                .reFormatToken(req.cookies['X-XSRF-TOKEN'], req.body['sub-token'])
                .checkTokenValid()
                .then(decoded => {                    
                    res.decoded = decoded;
                    res.authenticated = true;
                    next();
                })
                .catch( err => {                 
                    res.sendStatus(403).send("Unauthorized")
                })
    }
    
   
})
app.use("/", proutes);
app.listen(config.port, () => {
    console.log("Server is listening to "+config.port);
});
process.on("uncaughtException", (e)=>{
    console.log("asdfasdf", e)
})

module.exports = app;