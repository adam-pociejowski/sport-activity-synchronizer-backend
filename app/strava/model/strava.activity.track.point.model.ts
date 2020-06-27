import { LocationData } from "../../core/model/location.model";

export class StravaActivityTrackPoint {
    constructor(public location: LocationData,
                public time: number,
                public distance: number,
                public velocity: number) {}
}