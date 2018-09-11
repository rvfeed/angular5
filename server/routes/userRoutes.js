 import mongodb from "../db/connectDb";
 import  UserCtrl  from "../ctrls/userCtrl";
import ResMessage from '../lib/messages'
import HashedPassword from '../lib/createHash';
  function userRoutes(routes, rhbac){
      let uCtrl = new UserCtrl();
      routes.post("/getUsers", (req, res) => {
        uCtrl.getUsers()
            .then( result => {    
                 
                let replyMsg = new ResMessage(result);  
                replyMsg.results = result; 
                res.json(replyMsg);
                res.end();
            })
            .catch( err => {
                console.log(err)
                res.json(err);
                res.end();
            });
    });
    routes.delete("/user/:id", (req, res) => { 
        uCtrl.deleteUser(req.params.id)
     .then( user => {
       
        res.json({success:true, message: "User has been deleted successfully"});      
     })
     .catch( err => {
          res.json({success:false, message: "There was an error while deleting user!"});        
     }); 

});
routes.put("/user/:id", (req, res) => { 
        uCtrl.updateUser(req.params.id, req.body.user)
     .then( movie => {
        res.json({success:true, message: "User has been updated successfully"});      
     })
     .catch( err => {
         console.log(err)
          res.json({success:false, message: "There was an error while updating user!"});        
     }); 

});
routes.post("/deleteSelectedUsers", (req, res) => { 
        uCtrl.deleteSelectedUsers(req.body.movieIds)
     .then( movie => {
       
        res.json({success:true, message: "Selected Users have been deleted successfully"});      
     })
     .catch( err => {
          res.json({success:false, message: "There was an error while deleting user!"});        
     }); 

});

  }
module.exports = userRoutes;
    

