import { RestClientService } from "../../core/service/rest.client.service";
import { OAuthCredentials } from "../model/oauth.credentials.model";

export abstract class OAuthRestService<T> extends RestClientService<T> {
    private accessToken = 'adf1a508cde3aba0526217551e5be26f9b9f60fb';

    protected constructor(apiUrl: string, private credentials: OAuthCredentials) {
        super(apiUrl);
    }

    protected prepareAuthorizationHeader = (bearer: boolean = true) =>
        bearer ?
            `Bearer ${this.accessToken}` :
            this.accessToken;
}
