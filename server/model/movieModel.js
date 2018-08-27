import mongoDb from "../db/connectDb";
import mongodb from 'mongodb';
class MovieModel{
    constructor(){}
    findMovie(movie){
        return  mongoDb.dbo.collection("movies").findOne({"username": user });       
    }
     findMovies(obj){
         let sort = {}, findObj = {};
         sort[obj.sortBy] = -1;
         console.log(sort)
         if(obj.search != '')        
            findObj.movieName = obj.search;
         findObj.deleted = {$ne : 1}
         console.log(findObj)
        return new Promise((resolve, reject) => {
                mongoDb.dbo.collection("movies").find(findObj).limit(+obj.limit).sort(sort).toArray( (err, movies) => {
                        if(err) reject(err);  else resolve(movies);
                }); 
        }) 
              
    }
    saveMovie(movie){
        return mongoDb.dbo.collection("movies").insert(movie);
    }
    deleteMovie(movieId){
         return  mongoDb.dbo.collection("movies")
         .update({_id: mongodb.ObjectID(movieId)}, {$set: {deleted: 1}})
    }
     deleteSelectedMovies(movies){
         movies = movies.map( movie => mongodb.ObjectID(movie));
         return  mongoDb.dbo.collection("movies")
         .updateMany({_id: { $in : movies}}, {$set: {deleted: 1}})
    }
       updateMovie(movieId, movie){
           console.log(movieId)
           console.log(movie)
         return  mongoDb.dbo.collection("movies")
         .update({_id: mongodb.ObjectID(movieId)}, movie)
    }
}

export default MovieModel;