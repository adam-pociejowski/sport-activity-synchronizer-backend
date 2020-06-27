import { RequestArguments } from "../../core/model/request.arguments.model";
import { StravaActivity } from "../model/strava.activity.model";
import { StravaRestService } from "./strava.rest.service";

export class StravaActivityRestService extends StravaRestService<StravaActivity> {

    constructor() {
        super();
        this.getActivity('3659125692')
            .then((stravaActivity: StravaActivity) => {
                console.log(stravaActivity);
            })
    }

    getActivity = (id: string) =>
        this.get(`activities/${id}`, new RequestArguments(
            {},
            {},
            {
                Authorization:  this.prepareAuthorizationHeader()
            }));

    mapToResponseData = (data: any): StravaActivity =>
        new StravaActivity(
            data.id,
            data.name,
            data.distance,
            data.moving_time,
            data.elapsed_time,
            new Date(data.start_date)
        )
}
