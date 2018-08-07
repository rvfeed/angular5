import mongoDb from "../db/connectDb";

class MovieModel{
    constructor(){}
    findMovie(movie){
        return  mongoDb.dbo.collection("movies").findOne({"username": user });       
    }
     findMovies(){
        return new Promise((resolve, reject) => {
                mongoDb.dbo.collection("movies").find({}).toArray( (err, movies) => {
                        if(err) reject(err);
                        else resolve(movies);
                }); 
        }) 
              
    }
    saveMovie(movie){
        return mongoDb.dbo.collection("movies").insert(movie);
    }
}

export default MovieModel;