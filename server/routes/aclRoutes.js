import  AclCtrl  from "../ctrls/aclCtrl";
let aCtrl = new AclCtrl();
 function aclRoutes(routes){
    routes.get("/acl", (req, res) => {
       
        aCtrl.getAcl().then( m =>  { 
             console.log(m);
             if(m)
                 res.json({success: true, message: "User has been registered successfully", result: m}); 
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
 module.exports = aclRoutes;