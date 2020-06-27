import { StravaActivityTrackPoint } from "../model/strava.activity.track.point.model";
import { StravaRestService } from "./strava.rest.service";
import { StravaStreamType } from "../enums/strava.stream.type.enum";
import { LocationData } from "../../core/model/location.model";
import { RequestArguments } from "../../core/model/request.arguments.model";

export class StravaActivityTrackRestService extends StravaRestService<StravaActivityTrackPoint[]> {

    constructor() {
        super();
        this.getActivityTrack('3659125692')
            .then((track: StravaActivityTrackPoint[]) => {
                console.log(track);
            })
    }

    getActivityTrack = (id: string) =>
        this.get(`activities/${id}/streams/latlng,time,distance,velocity_smooth`,
            new RequestArguments(
                {},
                {},
                {
                    Authorization:  this.prepareAuthorizationHeader()
                })
        );

    mapToResponseData = (data: any): StravaActivityTrackPoint[] => {
        let track: StravaActivityTrackPoint[] = [];
        for (let index = 0; index < data[0].data.length; index++) {
            track.push(
                new StravaActivityTrackPoint(
                    this.findValueForStreamType(StravaStreamType.LOCATION, data, index),
                    this.findValueForStreamType(StravaStreamType.TIME, data, index),
                    this.findValueForStreamType(StravaStreamType.DISTANCE, data, index),
                    this.findValueForStreamType(StravaStreamType.VELOCITY, data, index)
                )
            )
        }
        return track;
    }

    private findValueForStreamType = (type: StravaStreamType, data: any, index: number) => {
        for (let i = 0; i < 4; i++) {
            if (data[i].type === type) {
                return type === StravaStreamType.LOCATION ?
                    new LocationData(data[i].data[index][0], data[i].data[index][1]) :
                    data[i].data[index];
            }
        }
        throw new Error(`Stream data element not found for type: ${type}, index: ${index}`);
    }
}
