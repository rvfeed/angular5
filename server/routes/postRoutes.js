import express from 'express';
import bcrypt from 'bcryptjs';
import  PostCtrl  from "../ctrls/postCtrl";
import mongodb from "../db/connectDb";
let postRoutes = function(routes){    
    let pCtrl = new PostCtrl(); 
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
