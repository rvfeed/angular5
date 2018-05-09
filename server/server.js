import express from 'express';
import bodyParser from 'body-parser';
import  config  from './config';
import  connectMongo  from './db/connectDb';
import proutes from "./routes/postRoutes" ;
const app = express();
//app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, x-access-token, X-XSRF-TOKEN");
    res.header("Content-Type", "application/json");
    next(); 
});

app.use("/", proutes);
/*app.get("/", (req, res) => {    
    res.send("welcome Home!");
    res.end();
});

app.post("/login", (req, res) => {
    console.log(req.body.user);
    connectMongo.dbo.collection(config.users).findOne({"username": req.body.user},
             (err, result) => {
                if (err) throw err;                
                connectMongo.db.close();
                res.json(result);
                res.end();
      });
    
    
});*/
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

module.exports = app;