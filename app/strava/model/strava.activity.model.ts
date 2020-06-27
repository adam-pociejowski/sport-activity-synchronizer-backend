export class StravaActivity {
    constructor(public id: string,
                public name: string,
                public distance: number,
                public movingTime: number,
                public elapsedTime: number,
                public startDate: Date) {}
}