import express from 'express';
import bodyParser from 'body-parser';
import  config  from './config';
import proutes from "./routes" ;
import TokenLib from './lib/tokenGen';
import cookieparser from 'cookie-parser';
import formidable from 'formidable';
import  nodemailer from 'nodemailer';
import generalRoutes from './routes/generalRoutes';
import acl from './acl/acl';
console.log("1\n")

/* new Promise( (r, j) => {
    for(let i =0; i < 10000000000; i++){}
    r("ok")
}).then(console.log) */
function testAsync(cb){
   process.nextTick( ()=> {
       for(let i =0; i < 10000000000; i++){}
    cb("ok");
   })
}
testAsync((a)=> console.log("asdasd", a))
//acl.can('admin', 'edit', {currentUserId:1 , userId: 1}).then(console.log)
 

console.log("2\n")
const IncomingForm = formidable.IncomingForm;


const app = express();
//app.use(express.static("static"));
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(cors({credentials: true}));
/*app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});*/
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
            //        console.log(err) 
                    res.sendStatus(403).send("Unauthorized")
                })           
    }
    
}
function authenticate(req, res, next){
        next(); return true;
        const exUrl = req.originalUrl.split("/").filter( r => r != "")[0];
        if(exclude.indexOf(exUrl) > -1 || req.method == "OPTIONS") next();
        else{
            console.log(req.originalUrl);
            checkAuth(req.cookies['X-XSRF-TOKEN'])(req.body['sub-token'])
                    .then(decoded => {                    
                        res.decoded = decoded;
                        res.authenticated = true;
                        next();
                    })
              .catch(e=> e)
        }
        
       
    }

app.get("/email", (req, res) =>{
console.log("emaillll")
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'raj.lh404@gmail.com',
    pass: '9885266514'
  }
});

var mailOptions = {
  from: 'raj.lh404@gmail.com',
  to: 'akhil406@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    res.json({"msg": "sent"})
    res.end()
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
});

app.post("/fileupload", (req, res) => {
  var form = new formidable.IncomingForm();

     var auth =  checkAuth(req.cookies['X-XSRF-TOKEN'])

form .on('field', function(name, field) {
        console.log('Got a field:', name);
//form.emit("end")
    })
    form.on("fileBegin", (name, file) => {
        file.path = __dirname+"/uploads/"+file.name;
    })
    form.on('file', function(name, file) {
        console.log('Got a file:', file.name, name);
    
//form.emit("end")
    })
   
    form.parse(req);
    
form.on('end', function() {
        res.json({"success": true})
        res.end();
    })
form.on('progress', function(bytesReceived, bytesExpected) {
    console.log(bytesReceived, "--", bytesExpected)
});
    
})
app.use("/api/v1", proutes);
app.use("/static", generalRoutes);
app.listen(config.port, () => {
    console.log("Server is listening to "+config.port);
});

process.on("uncaughtException", (e)=>{
   console.log("asdfasdf", e)
})

module.exports = app;