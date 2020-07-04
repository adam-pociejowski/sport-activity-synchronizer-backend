import { StravaActivitiesRestService } from "./strava.activities.rest.service";
import { StravaActivityTrackRestService } from "./strava.activity.track.rest.service";
import { MongoService } from "../../mongo/service/mongo.service";
import { StravaActivity } from "../model/strava.activity.model";
import { StravaTrackOptimizeService } from "./strava.track.optimize.service";
import { StravaActivityRestService } from "./strava.activity.rest.service";

export class StravaService extends MongoService<StravaActivity[]> {
    private stravaActivityTrackRestService = new StravaActivityTrackRestService();
    private stravaActivitiesRestService = new StravaActivitiesRestService();
    private stravaActivityRestService = new StravaActivityRestService();
    private stravaTrackOptimizeService = new StravaTrackOptimizeService();

    constructor() {
        super('activity', 'sport-activity');
    }

    public saveActivity = (activityId: string) =>
        this.stravaActivityRestService
            .getActivity(activityId)
            .then((activity: StravaActivity) => this.processForActivities([activity]))

    public saveActivitiesPage = (page: number, pageSize: number) =>
        this.stravaActivitiesRestService
            .getActivities(page, pageSize)
            .then((activities: StravaActivity[]) => this.processForActivities(activities));

    private processForActivities = (activities: StravaActivity[]) => {
        console.log(`Found ${activities.length} activities`)
        Promise
            .all(this.prepareActivityTrackPromises(activities))
            .then((tracks: any[]) => {
                try {
                    this.insertMany(this.appendTracksToActivities(activities, tracks))
                } catch (e) {
                    console.log('Exception while trying to save activities', e)
                }
            });
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
            activities[index].track = this.stravaTrackOptimizeService.optimize(tracks[index]);
        }
        return activities;
    };
}
