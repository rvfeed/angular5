import mongoDb from "../db/connectDb";
import mongodb from 'mongodb';
class MovieModel{
    constructor(){}
    findMovie(movie){
        return  mongoDb.dbo.collection("movies").findOne({"username": user });       
    }
     findMovies(){
        return new Promise((resolve, reject) => {
                mongoDb.dbo.collection("movies").find({deleted: {$ne: 1}}).toArray( (err, movies) => {
                        if(err) reject(err);
                        else resolve(movies);
                }); 
        }) 
              
    }
    saveMovie(movie){
        return mongoDb.dbo.collection("movies").insert(movie);
    }
    deleteMovie(movieId){
         return  mongoDb.dbo.collection("movies").update({_id: mongodb.ObjectID(movieId)}, {$set: {deleted: 1}})
    }
       updateMovie(movieId, movie){
           console.log(movieId)
           console.log(movie)
         return  mongoDb.dbo.collection("movies").update({_id: mongodb.ObjectID(movieId)}, movie)
    }
}

export default MovieModel;