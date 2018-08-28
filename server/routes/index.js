import express from 'express';
import postRoutes from './postRoutes'
import movieRoutes from './movieRoutes'
import generalRoutes from './generalRoutes'
import userRoutes from './userRoutes'
const routes = express.Router();
postRoutes(routes);
movieRoutes(routes);
userRoutes(routes);
generalRoutes(routes);
module.exports = routes;