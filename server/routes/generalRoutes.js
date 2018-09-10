 import mongodb from "../db/connectDb";
 import  UserCtrl  from "../ctrls/userCtrl";
import ResMessage from '../lib/messages'
import HashedPassword from '../lib/createHash';
  function generalRoutes(routes){
      let uCtrl = new UserCtrl();    
      routes.post("/login", async (req, res) => {
                
     const hashPwd = new HashedPassword(req.body.user.password)
      req.body.user.password = hashPwd.hashedPassword;
       let result=  await uCtrl.login(req.body.user)
       let replyMsg = new ResMessage(result);
       let jtoken = await replyMsg.generateToken;  
                if(jtoken){
                    replyMsg.token = jtoken.substring(jtoken.length-10, jtoken.length); 
                    res.cookie('X-XSRF-TOKEN', 
                                jtoken.substring(0, jtoken.length-10),
                                { maxAge: 900000, httpOnly: true });
                }else{
                    replyMsg.msg = "Error"
                }
                res.json(replyMsg);               ;
                res.end();
           
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
module.exports = generalRoutes;
    
