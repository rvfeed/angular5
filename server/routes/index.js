import express from 'express';
import postRoutes from './postRoutes'
import movieRoutes from './movieRoutes'
import userRoutes from './generalRoutes'
const routes = express.Router();
postRoutes(routes);
movieRoutes(routes);
userRoutes(routes);
module.exports = routes;