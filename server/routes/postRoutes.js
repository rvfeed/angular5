import express from 'express';
import bcrypt from 'bcryptjs'
import  UserCtrl  from "../ctrls/userCtrl";
import  PostCtrl  from "../ctrls/postCtrl";
import  MovieCtrl  from "../ctrls/movieCtrl";
import mongodb from "../db/connectDb";
import ResMessage from '../lib/messages'

let postRoutes = function(routes){
    let uCtrl = new UserCtrl()
    let pCtrl = new PostCtrl()
    let mCtrl = new MovieCtrl()
   
    routes.post("/login", (req, res) => {
         console.log("hello login")
        console.log(req.body.user.password)
    //   var hashedPassword = bcrypt.hashSync(req.body.user.password, 8);
    //  req.body.user.password = hashedPassword;
        uCtrl.login(req.body.user)
        .then( result => {
           
            var randomNumber=Math.random().toString();
            let replyMsg = new ResMessage(result);
             console.log("result", replyMsg)
            randomNumber=randomNumber.substring(2,randomNumber.length);
            res.cookie('x-xsrf-token', replyMsg.generateToken,
            { maxAge: 900000, httpOnly: true })

            res.json(replyMsg);
            res.end();
        })
        .catch( err => {
             res.json(err);
            res.end();
        });
    });
    routes.post("/register", (req, res) => {
        console.log(req.body.user.password)
    //   var hashedPassword = bcrypt.hashSync(req.body.user.password, 8);
    //  req.body.user.password = hashedPassword;
        uCtrl.register(req.body.user).then( m =>  { 
            console.log(m);
            if(m.result.ok)
                res.json({success: true, message: "User has been registered successfully"}); 
            else
                res.json({success: false, message: "Unable to register the user"});
            res.end();
        } )
        .catch( err => {
            res.status(500).send("There was a problem registering the user.")
        })
    })

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
        //    console.log(err);
            res.json({"success": false});
        })
    })
    routes.get("/readPost/:id", (req, res) =>{
        pCtrl.readPost(req.params.id)
        .then(result => {
        //  console.log(result);
            res.json({"result": result});
            res.end()
        })
        .catch( err => {
    //     console.log(err);
            res.end();
        })
    })
    .delete("/postStatus/:id", (req, res) =>{ 
        pCtrl.deleteStatus(req.params.id)
        .then( msg => {
            res.json({"success": true});
            res.end()
        })
        .catch(err => {
    //     console.log(err);
            res.json({"success": false});
            res.end()
        })
    });
    routes.post("/likeStatus/:id", (req, res) =>{
        pCtrl.likeStatus(req.params.id, req.body.like)
        .then( msg => {
            res.json({"success": true});
        })
        .catch(err => {
            console.log(err);
            res.json({"success": false});
        })
    })
    routes.post("/postStatus", (req, res) =>{
        pCtrl.saveStatus(req.body.status)
        .then( msg => {
            res.json({"success": true});
        })
        .catch(err => {
            console.log(err);
            res.json({"success": false});
        })
    });
    routes.post("/addComment/:id", (req, res) =>{
        pCtrl.addComment(req.params.id, req.body.comment)
        .then( msg => {
            res.json({"success": true});
        })
        .catch(err => {
        //    console.log(err);
            res.json({"success": false});
        })
    });
    routes.post("/deleteComment/:id", (req, res) =>{
        pCtrl.deleteComment(req.params.id, req.body.commentId)
        .then( msg => {
            res.json({"success": true});
        })
        .catch(err => {
        //   console.log(err);
            res.json({"success": false});
        })
    });
    routes.post("/likeComment/:id", (req, res) =>{
        pCtrl.likeComment(req.params.id, req.body.commentId)
        .then( msg => {
            res.json({"success": true});
        })
        .catch(err => {
    //     console.log(err);
            res.json({"success": false});
        })
    });

    routes.get("/readAllPosts", (req, res) => {
    
        pCtrl.readAll()
        .then(result => {
            console.log(result);
            res.json({"result": result});
            res.end()
        })
        .catch( err => {
        //    console.log(err);
            res.end();
        })
    })
    return routes;
}
module.exports = postRoutes;
