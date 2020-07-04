import { RequestArguments } from "../../core/model/request.arguments.model";
import { StravaActivity } from "../model/strava.activity.model";
import { StravaRestService } from "./strava.rest.service";
import { MetricUtils } from "../../core/util/MetricUtils";

export class StravaActivityRestService extends StravaRestService<StravaActivity> {

    constructor() {
        super();
    }

    getActivity = (id: string) =>
        this.getAccessToken()
            .then((accessToken: string) =>
                this.get(`activities/${id}`, new RequestArguments(
                    {},
                    {},
                    {
                        Authorization:  accessToken
                    })));

    mapToResponseData = (data: any): StravaActivity =>
        new StravaActivity(
            data.id,
            data.name,
            data.distance,
            data.moving_time,
            data.elapsed_time,
            data.type,
            MetricUtils.metersPerSecToKilometersPerHour(data.average_speed),
            MetricUtils.metersPerSecToKilometersPerHour(data.max_speed),
            new Date(data.start_date)
        )
}
