import express from 'express';
import bodyParser from 'body-parser';
import  config  from './config';
import  connectMongo  from './db/connectDb';
import proutes from "./routes/routes" ;
import bcrypt from 'bcryptjs';
import TokenLib from './lib/tokenGen';

const app = express();
//app.use(express.static("static"));

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
app.use((req, res, next) => {
  //  console.log(req.cookies["X-XSRF-TOKEN"]);
   // const tokenObj = new TokenLib(req.cookies['X-XSRF-TOKEN'], req.headers['sub-token'])
   next();
})
app.use("/", proutes);

app.post("/register", (req, res) => {    
    let doc = [];
    doc.push(req.body);
     connectMongo.dbo.collection("users").insertMany(doc)
    .then( (result) => {
        console.log(result);
    }).catch((err) =>{
        console.log(err);
    })
    res.json({"response": "success" });
    res.end();
})

app.listen(config.port, () => {
    console.log("Server is listening to "+config.port);
});
process.on("uncaughtException", (e)=>{
    console.log("asdfasdf", e)
})

module.exports = app;