 import mongodb from "../db/connectDb";
 import  UserCtrl  from "../ctrls/userCtrl";
 import  AclCtrl  from "../ctrls/aclCtrl";
import ResMessage from '../lib/messages'
import HashedPassword from '../lib/createHash';
  function userRoutes(routes){
      let uCtrl = new UserCtrl();    
      routes.post("/login", (req, res) => {
                
     const hashPwd = new HashedPassword(req.body.user.password)
      req.body.user.password = hashPwd.hashedPassword;
        uCtrl.login(req.body.user)
            .then( result => {     
                    
                let replyMsg = new ResMessage(result);   
                  console.log(replyMsg)                      
                replyMsg.token = replyMsg.generateToken
                                        .substring(replyMsg.generateToken.length-10, 
                                                    replyMsg.generateToken.length);            
                res.cookie('X-XSRF-TOKEN', 
                            replyMsg.generateToken.substring(0, replyMsg.generateToken.length-10),
                            { maxAge: 900000, httpOnly: true });
                    
                res.json(replyMsg);
                res.end();
            })
            .catch( err => {
                console.log(err)
                res.json(err);
                res.end();
            });
    });
    routes.post("/register", (req, res) => {       
       const hashPwd = new HashedPassword(req.body.user.password);   
        req.body.user.password = hashPwd.hashedPassword;           
        uCtrl.register(req.body.user).then( m =>  { 
            console.log(m);
            if(m.result.ok)
                res.json({success: true, message: "User has been registered successfully"}); 
            else
                res.json({success: false, message: "Unable to register the user"});
            res.end();
        } )
        .catch( err => {
            console.log(err);
            res.status(500).send("There was a problem registering the user.")
        })
    })
  
  }
module.exports = userRoutes;
    
