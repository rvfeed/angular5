import routes from './routes';
import  MovieCtrl  from "../ctrlsmovieCtrl";
let mCtrl = new MovieCtrl();
routes.get("/movies", (req, res) => {    
    res.send("welcome Home!");
    res.end();
});
routes.post("/movies", (req, res) => {    
    res.send("welcome Home!");
    res.end();
});
routes.post("/movie/:id", (req, res) => {    
    res.send("welcome Home!");
    res.end();
});