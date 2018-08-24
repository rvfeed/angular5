import  MovieCtrl  from "../ctrls/movieCtrl";
let mCtrl = new MovieCtrl();
let MovieRoutes = function(routes){
    routes.post("/movies", (req, res) => { 
   //console.log(req.headers.cookie.match(^))
   mCtrl.findMovies(req.body).then( movies =>{
res.json(movies|| {});
    res.end();
    });  
    
});
routes.post("/addmovie", (req, res) => {
  // console.log("req.body", req.body);
     mCtrl.saveMovie(req.body.movie)
     .then( movie => {
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
return routes;
}
module.exports = MovieRoutes;
