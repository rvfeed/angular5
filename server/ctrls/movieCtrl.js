import MovieModel from "../model/movieModel";
class MovieCtrl{
    user;
    constructor(){
        this.movie = new MovieModel();
    }    
    findMovie(movie){
       return this.movie.findMovie(movie);        
    }
     findMovies(){
       return this.movie.findMovies();        
    }
    saveMovie(movieData){
      return this.movie.saveMovie(movieData);        
    }
       deleteMovie(movieId){
      return this.movie.deleteMovie(movieId);        
    }
    updateMovie(id, movie){
        return this.movie.updateMovie(id, movie);      
    }
}

export default MovieCtrl;