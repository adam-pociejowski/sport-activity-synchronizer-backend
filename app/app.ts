import { NextFunction, Request, Response } from "express";
import {StravaService} from "./strava/service/strava.service";

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
require('./app.routing')(app);

app.use(function(req : Request, res: Response, next: NextFunction) {
    next(createError(404));
});

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


module.exports = app;

new StravaService();