import express from 'express';
import bodyParser from 'body-parser';
import  config  from './config';
import proutes from "./routes" ;
import TokenLib from './lib/tokenGen';
import cookieparser from 'cookie-parser';
import formidable from 'formidable';
import  nodemailer from 'nodemailer';
import generalRoutes from './routes/generalRoutes';
import HRBAC from './acl/acl';

const app = express();
const routes = express.Router();
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "hello, Content-Type, Origin, Accept, x-access-token, X-XSRF-TOKEN");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "application/json");
    next(); 
});

const exclude = ["login", "register", "fileupload", "email", "acl"];
function checkAuth(c){
    const tokenObj = new TokenLib();
    return function(b){
        return tokenObj
                .reFormatToken(c, b)
                .checkTokenValid()   
                 .catch( err => {
                    res.sendStatus(403).send("Unauthorized")
                })           
    }
    
}
function authenticate(req, res, next){
       // next(); return true;
        const exUrl = req.originalUrl.split("/").filter( r => r != "")[0];
        if(exclude.indexOf(exUrl) > -1 || req.method == "OPTIONS") next();
        else{            
            checkAuth(req.cookies['X-XSRF-TOKEN'])(req.body['sub-token']?req.body['sub-token']:req.param('sub-token'))
                    .then(decoded => {    
                        console.log(decoded)                
                        req.decoded = decoded;
                        req.authenticated = true;
                        next();
                    })
              .catch(e=> { next(); })
        }
    }



generalRoutes(routes);
app.use("/api/v1", authenticate, proutes);
app.use("/static", routes);
app.listen(config.port, () => {
    console.log("Server is listening to "+config.port);
});

process.on("uncaughtException", (e)=>{
   console.log("asdfasdf", e)
})

module.exports = app;