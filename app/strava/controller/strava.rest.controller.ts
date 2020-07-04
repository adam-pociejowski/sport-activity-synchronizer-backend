import { Request, Response } from "express";
import * as express from 'express';
import { StravaService } from "../service/strava.service";
import { StravaOAuthProvider } from "../service/strava.oauth.provider";

export class StravaRestController {
    public router = express.Router();
    private stravaService = new StravaService();
    private oauthProvider = StravaOAuthProvider.getInstance();

    constructor() {
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.post('/list', this.saveActivities);
        this.router.post('/:id', this.saveActivity);
        this.router.get('/exchange_token', this.exchangeToken);
    };

    private exchangeToken = (request: Request, response: Response) => {
        this.oauthProvider
            .getAccessTokenFromAuthorizationCode(request.query.code as string);
        response.send('OK');
    };

    private saveActivities = (request: Request, response: Response) =>
        this.stravaService
            .saveActivitiesPage(+request.query.page!!, +request.query.pageSize!!)
            .then(() => response.send('Activities saved'))
            .catch((err: any) => response.send(err));

    private saveActivity = (request: Request, response: Response) =>
        this.stravaService
            .saveActivity(request.params.id)
            .then(() => response.send(`Activity ${request.params.id} saved`))
            .catch((err: any) => response.send(err));
}
