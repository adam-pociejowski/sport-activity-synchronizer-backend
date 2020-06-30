import { MongoClient } from 'mongodb';
import { StravaActivity } from "../../strava/model/strava.activity.model";

export abstract class MongoService<T> {
    protected constructor(private collectionName: string,
                          private databaseName: string) {}

    protected insertMany = (activities: StravaActivity[]) => {
        let mongoClient = this.getMongoClient();
        mongoClient.connect(() =>
            mongoClient
                .db(this.databaseName)
                .collection(this.collectionName)
                .insertMany(activities, function (err: any, result: any) {
                    mongoClient.close();
                }))
    }

    private getMongoClient = () => new MongoClient(process.env.MONGODB_CONNECTION_URL!!);
}