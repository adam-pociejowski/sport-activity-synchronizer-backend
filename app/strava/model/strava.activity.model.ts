import { StravaActivityTrackPoint } from "./strava.activity.track.point.model";

export class StravaActivity {
    constructor(public id: string,
                public name: string,
                public distance: number,
                public movingTime: number,
                public elapsedTime: number,
                public type: string,
                public averageSpeed: number,
                public maxSpeed: number,
                public startDate: Date,
                public track: StravaActivityTrackPoint[] = []) {}
}