import express from 'express';
import  UserCtrl  from "../ctrls/userCtrl";
import  PostCtrl  from "../ctrls/postCtrl";
import  MovieCtrl  from "../ctrls/movieCtrl";
import mongodb from "../db/connectDb";
let routes = express.Router();
let uCtrl = new UserCtrl()
let pCtrl = new PostCtrl()
let mCtrl = new MovieCtrl()
routes.post("/login", (req, res) => {
    uCtrl.login(req.body.user)
    .then( result => {
        res.json(result || {});
        res.end();
    })
    .catch( err => {
   //     console.log(err);
    });
});
routes.post("/register", (req, res) => {
    uCtrl.register(req.body.user).then( m =>  { 
        console.log(m);
         res.send(m); 
         res.end();
     } )
})
routes.post("/movies", (req, res) => { 
//   console.log(req.params)
   mCtrl.findMovies(req.body).then( movies =>{
res.json(movies|| {});
    res.end();
    });  
    
});
routes.post("/addmovie", (req, res) => {
  // console.log("req.body", req.body);
     mCtrl.saveMovie(req.body.movie)
     .then( movie => {
         console.log(movie)
        res.json({success:true,  data: movie.ops[0], message: "Movie has been added successfully"});      
     })
     .catch( err => {
          res.json({success:false, message: "There was an error while adding movie!"});        
     })   
});
routes.post("/movie/:id", (req, res) => {    
    res.send("welcome Home!");
    res.end();
});
routes.delete("/movie/:id", (req, res) => { 
        mCtrl.deleteMovie(req.params.id)
     .then( movie => {
       
        res.json({success:true, message: "Movie has been deleted successfully"});      
     })
     .catch( err => {
          res.json({success:false, message: "There was an error while deleting movie!"});        
     }); 

});
routes.put("/movie/:id", (req, res) => { 
        mCtrl.updateMovie(req.params.id, req.body.movie)
     .then( movie => {
        res.json({success:true, message: "Movie has been updated successfully"});      
     })
     .catch( err => {
          res.json({success:false, message: "There was an error while updating movie!"});        
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
export default routes;
