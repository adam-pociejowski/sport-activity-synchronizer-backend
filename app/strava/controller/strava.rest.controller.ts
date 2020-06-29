import { Request, Response } from "express";
import * as express from 'express';
import { StravaService } from "../service/strava.service";

export class StravaRestController {
    public router = express.Router();
    private stravaService = new StravaService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post('/list', this.saveActivities);
        this.router.post('/:id', this.saveActivity);
    }

    saveActivities = (request: Request, response: Response) =>
        this.stravaService.saveActivitiesPage(+request.query.page, +request.query.pageSize)
            .then(() => response.send('Activities saved'));

    saveActivity = (request: Request, response: Response) =>
        this.stravaService.saveActivity(request.params.id)
            .then(() => response.send(`Activity ${request.params.id} saved`));
}
