import { RequestArguments } from "../../core/model/request.arguments.model";
import { StravaActivity } from "../model/strava.activity.model";
import { StravaRestService } from "./strava.rest.service";
import {MetricUtils} from "../../core/util/MetricUtils";

export class StravaActivitiesRestService extends StravaRestService<StravaActivity[]> {

    constructor() {
        super();
    }

    getActivities = (page: number, pageSize: number) =>
        this.get(`athlete/activities`, new RequestArguments(
            {},
            {
                per_page: pageSize,
                page: page
            },
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
                MetricUtils.metersPerSecToKilometersPerHour(element.average_speed),
                MetricUtils.metersPerSecToKilometersPerHour(element.max_speed),
                new Date(element.start_date)
            )
        );
}
