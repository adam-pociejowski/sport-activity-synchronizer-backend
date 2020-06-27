import { Client } from "node-rest-client-promise";
import { RequestArguments } from "../model/request.arguments.model";

export abstract class RestClientService<T> {
    protected client: Client;
    protected apiUrl: string;

    protected constructor(apiUrl: string) {
        this.client = new Client({});
        this.apiUrl = apiUrl;
    }

    get = (path: string, args?: RequestArguments) =>
        this.client
            .getPromise(`${this.apiUrl}/${path}`, args)
            .then((response: any) => this.mapToResponseData(response.data))
            .catch((error) => {
                console.error(error);
            });

    abstract mapToResponseData(data: any) : T;
}
