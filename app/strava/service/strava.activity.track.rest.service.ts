import { StravaActivityTrackPoint } from "../model/strava.activity.track.point.model";
import { StravaRestService } from "./strava.rest.service";
import { StravaStreamType } from "../enums/strava.stream.type.enum";
import { LocationData } from "../../core/model/location.model";
import { RequestArguments } from "../../core/model/request.arguments.model";
import { MetricUtils } from "../../core/util/MetricUtils";
import {StravaActivityTrackStream} from "../model/strava.activity.track.stream.model";

export class StravaActivityTrackRestService extends StravaRestService<StravaActivityTrackStream[]> {

    constructor() {
        super();
    }

    getActivityTrack = (id: string) =>
        this.getAccessToken()
            .then((accessToken: string) =>
                this.get(`activities/${id}/streams/latlng,time,distance,velocity_smooth,moving`,
                    new RequestArguments(
                        {},
                        {},
                        {
                            Authorization:  accessToken
                        })));

    mapToResponseData = (data: any): StravaActivityTrackStream[] => {
        let track: StravaActivityTrackStream[] = [];
        for (let index = 0; index < data[0].data.length; index++) {
            track.push(
                new StravaActivityTrackStream(
                    new StravaActivityTrackPoint(
                        this.findValueForStreamType(StravaStreamType.LOCATION, data, index),
                        this.findValueForStreamType(StravaStreamType.TIME, data, index),
                        this.findValueForStreamType(StravaStreamType.DISTANCE, data, index),
                        MetricUtils.metersPerSecToKilometersPerHour(this.findValueForStreamType(StravaStreamType.VELOCITY, data, index))
                    ),
                    this.findValueForStreamType(StravaStreamType.MOVING, data, index)
                )
            )
        }
        return track;
    }

    private findValueForStreamType = (type: StravaStreamType, data: any, index: number) => {
        for (let i = 0; i < 5; i++) {
            if (data[i].type === type) {
                return type === StravaStreamType.LOCATION ?
                    new LocationData(data[i].data[index][0], data[i].data[index][1]) :
                    data[i].data[index];
            }
        }
        throw new Error(`Stream data element not found for type: ${type}, index: ${index}`);
    }
}
