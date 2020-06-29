import { StravaActivitiesRestService } from "./strava.activities.rest.service";
import { StravaActivityTrackRestService } from "./strava.activity.track.rest.service";
import { MongoService } from "../../mongo/service/mongo.service";
import { StravaActivity } from "../model/strava.activity.model";
import { StravaOptimizeService } from "./strava.optimize.service";

export class StravaService extends MongoService<StravaActivity[]> {
    private stravaActivityTrackRestService = new StravaActivityTrackRestService();
    private stravaActivitiesRestService = new StravaActivitiesRestService();
    private stravaOptimizeService = new StravaOptimizeService();

    constructor() {
        super('activity', 'sport-activity');
        this.stravaActivitiesRestService
            .getActivities()
            .then((activities: StravaActivity[]) =>
                Promise
                    .all(this.prepareActivityTrackPromises(activities))
                    .then((tracks: any[]) =>
                        this.insertMany(this.appendTracksToActivities(activities, tracks))));
    }

    private prepareActivityTrackPromises = (activities: StravaActivity[]) =>
        activities
            .map((activity: StravaActivity) =>
                this.stravaActivityTrackRestService.getActivityTrack(activity.id));

    private appendTracksToActivities = (activities: StravaActivity[], tracks: any[]) => {
        for (let index = 0; index < activities.length; index++) {
            if (activities.length !== tracks.length) {
                throw new Error(`Number of activities in not equal to number of tracks. 
                                 Activities: ${activities.length}, tracks: ${tracks.length}`)
            }
            activities[index].track = this.stravaOptimizeService.optimize(tracks[index]);
        }
        return activities;
    };
}
