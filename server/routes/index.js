import express from 'express';
import postRoutes from './postRoutes'
import movieRoutes from './movieRoutes'
import userRoutes from './userRoutes'
import aclRoutes from './aclRoutes'
const routes = express.Router();
postRoutes(routes);
movieRoutes(routes);
userRoutes(routes);
aclRoutes(routes);
module.exports = routes;