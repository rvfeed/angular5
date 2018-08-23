import express from 'express';
let routes = express.Router();
import postRoutes from './postRoutes'
import movieRoutes from './movieRoutes'
routes = postRoutes(routes);
routes = movieRoutes(routes);
module.exports = routes;