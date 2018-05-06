import express from 'express';
import  UserCtrl  from "../ctrls/userCtrl";
import  PostCtrl  from "../ctrls/postCtrl";
let routes = express.Router();
let uCtrl = new UserCtrl()
let pCtrl = new PostCtrl()
routes.post("/login", (req, res) => {
    uCtrl.login(req.body.user)
    .then( result => {
        res.json(result || {});
        res.end();
    })
    .catch( err => {
        console.log(err);
    });
});

routes.get("/", (req, res) => {    
    res.send("welcome Home!");
    res.end();
});

routes.post("/postStatus", (req, res) =>{
    pCtrl.saveStatus(req.body.status)
    .then( msg => {
        res.json({"success": true});
    })
    .catch(err => {
        res.json({"success": false});
    })
})
export default routes;
