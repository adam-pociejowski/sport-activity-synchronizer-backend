import { RequestArguments } from "../model/request.arguments.model";
const client = require('node-rest-client-promise').Client({});

export abstract class RestClientService<T> {
    protected apiUrl: string;

    protected constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    get = (path: string, args?: RequestArguments) =>
        client
            .getPromise(`${this.apiUrl}/${path}`, args)
            .then((response: any) => this.mapToResponseData(response.data))
            .catch((error: any) => {
                console.error(error);
            });

    abstract mapToResponseData(data: any) : T;
}
