import { RestClientService } from "../../core/service/rest.client.service";
import { OAuthCredentials } from "../model/oauth.credentials.model";

export abstract class OAuthRestService<T> extends RestClientService<T> {
    private accessToken = 'd96098ffa28bf46566ba21efbd1f470bcd147985';

    protected constructor(apiUrl: string, private credentials: OAuthCredentials) {
        super(apiUrl);
    }

    protected prepareAuthorizationHeader = (bearer: boolean = true) =>
        bearer ?
            `Bearer ${this.accessToken}` :
            this.accessToken;
}
