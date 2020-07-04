import { StravaActivityTrackPoint } from "../model/strava.activity.track.point.model";

export class StravaTrackOptimizeService {

    public optimize = (track: StravaActivityTrackPoint[]) =>
        this.removePointsWithoutPositionChanged(
            this.removeElementsBeforeStart(track));

    private removePointsWithoutPositionChanged = (stravaActivityTrackPoints: StravaActivityTrackPoint[]) => {
        let filteredPoints: StravaActivityTrackPoint[] = [];
        let timeOffsets: number[] = [];
        let previousPoint: StravaActivityTrackPoint | null = null;
        let startPausePoint: any = null;
        let currentTimeOffset = stravaActivityTrackPoints[0].time;
        stravaActivityTrackPoints
            .forEach((currentPoint: StravaActivityTrackPoint) => {
                if (this.isBeginOfPause(startPausePoint, previousPoint, currentPoint)) {
                    startPausePoint = previousPoint;
                } else if (this.isNotPause(startPausePoint) || this.isEndOfPause(startPausePoint, currentPoint)) {
                    if (this.isEndOfPause(startPausePoint, currentPoint)) {
                        currentTimeOffset += previousPoint!!.time - startPausePoint.time;
                        startPausePoint = null;
                    }
                    timeOffsets.push(currentTimeOffset);
                    filteredPoints.push(currentPoint);
                }
                previousPoint = currentPoint;
            });
        return this.appendTimeOffsets(filteredPoints, timeOffsets);
    };

    private removeElementsBeforeStart = (track : StravaActivityTrackPoint[]) => {
        let firstPointGreaterThanZero = track
            .find((element: StravaActivityTrackPoint) => element.distance > 0);
        return track.slice(track.indexOf(firstPointGreaterThanZero!!) - 1);
    };

    private isBeginOfPause = (startPausePoint: StravaActivityTrackPoint,
                              previousPoint: StravaActivityTrackPoint | null,
                              currentPoint: StravaActivityTrackPoint) =>
        previousPoint !== null && startPausePoint === null && previousPoint.distance === currentPoint.distance;

    private isEndOfPause = (startPausePoint: StravaActivityTrackPoint,
                            currentPoint: StravaActivityTrackPoint) =>
        startPausePoint !== null && startPausePoint.distance < currentPoint.distance;

    private isNotPause = (startPausePoint: StravaActivityTrackPoint) =>
        startPausePoint === null;

    private appendTimeOffsets = (filteredPoints: StravaActivityTrackPoint[],
                                 timeOffsets: number[]) =>
        filteredPoints
            .map((point: StravaActivityTrackPoint, index: number) => {
                point.time -= timeOffsets[index];
                return point;
            });
}
