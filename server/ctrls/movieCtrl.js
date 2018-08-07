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
}

export default MovieCtrl;