import 'dotenv/config';
import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config'
import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';

const router = express()

const httpServer = http.createServer(router);

let serviceAccountKey = require('./config/key.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey)
});

mongoose.connect(config.mongo.url, config.mongo.options)
.then(() => {
    logging.info('Mongoose initialized');
})
.catch((err) => {
    logging.error(err);
});

router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});


router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});


httpServer.listen(config.server.port, () => logging.info(`⚡️[server]: Server is listening 🎧 on port:${config.server.port}`));