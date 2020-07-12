import { StravaActivityTrackPoint } from "../model/strava.activity.track.point.model";
import { StravaActivityTrackStream } from "../model/strava.activity.track.stream.model";
import { ObjectUtils } from "../../core/util/ObjectUtils";

export class StravaTrackOptimizeService {

    public optimize = (streams: StravaActivityTrackStream[]) => {
        let filteredPoints: StravaActivityTrackPoint[] = [];
        let currentTimeOffset = 0;
        for (let index = 1; index < streams.length; index++) {
            let currentStream = ObjectUtils.copy(streams[index]);
            let previousPoint = ObjectUtils.copy(streams[index - 1].point);
            if (currentStream.moving) {
                if (this.isFirstPoint(filteredPoints)) {
                    this.addPointWithCorrectTime(filteredPoints, previousPoint, currentTimeOffset);
                }
                this.addPointWithCorrectTime(filteredPoints, currentStream.point, currentTimeOffset);
            } else {
                currentTimeOffset += currentStream.point.time - previousPoint.time;
            }
        }
        return filteredPoints;
    };

    private addPointWithCorrectTime = (filteredPoints: StravaActivityTrackPoint[],
                                       point: StravaActivityTrackPoint,
                                       timeOffset: number) => {
        point.time -= timeOffset;
        filteredPoints.push(point);
    }

    private isFirstPoint= (filteredPoints: StravaActivityTrackPoint[]) => filteredPoints.length == 0;
}
