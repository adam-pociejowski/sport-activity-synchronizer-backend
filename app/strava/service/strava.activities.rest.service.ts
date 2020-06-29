import { RequestArguments } from "../../core/model/request.arguments.model";
import { StravaActivity } from "../model/strava.activity.model";
import { StravaRestService } from "./strava.rest.service";

export class StravaActivitiesRestService extends StravaRestService<StravaActivity[]> {

    constructor() {
        super();
    }

    getActivities = () =>
        this.get(`athlete/activities`, new RequestArguments(
            {},
            {},
            {
                Authorization:  this.prepareAuthorizationHeader()
            }));

    mapToResponseData = (data: any[]): StravaActivity[] =>
        data.map((element: any) =>
            new StravaActivity(
                element.id,
                element.name,
                element.distance,
                element.moving_time,
                element.elapsed_time,
                element.type,
                new Date(element.start_date)
            )
        );
}
