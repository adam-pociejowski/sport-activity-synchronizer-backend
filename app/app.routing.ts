import { StravaRestController } from "./strava/controller/strava.rest.controller";

module.exports = function(app: any) {
    app.use('/rest/strava', new StravaRestController().router);
};
