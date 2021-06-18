import express from 'express';
import config from '../config';
import middleware from '../middleware';
import category from '../controllers/category'
import initializeDb from '../db';

let routers = express();

// connect to DB
initializeDb(db => {
    routers.use(middleware({ config, db }));

    // api routes v2 (/v1)
    routers.use('/category', category({ config, db }));
});

export default routers;