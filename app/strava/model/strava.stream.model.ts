import { StravaStreamType } from "../enums/strava.stream.type.enum";

export class StravaStream<T> {
    constructor(public type: StravaStreamType,
                public data: T[]) {}
}