import { StravaActivityTrackPoint } from "./strava.activity.track.point.model";

export class StravaActivityTrackStream {
    constructor(public point: StravaActivityTrackPoint,
                public moving: boolean) {}
}