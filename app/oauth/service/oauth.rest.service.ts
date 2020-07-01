import { RestClientService } from "../../core/service/rest.client.service";
import { OAuthCredentials } from "../model/oauth.credentials.model";
import {StravaOAuthProvider} from "../../strava/service/strava.oauth.provider";
const request = require('request-promise');

export abstract class OAuthRestService<T> extends RestClientService<T> {
    private accessToken = 'adf1a508cde3aba0526217551e5be26f9b9f60fb';

    protected constructor(apiUrl: string, private credentials: OAuthCredentials) {
        super(apiUrl);
        this.getAccessToken();
        let oauthProvider = StravaOAuthProvider.getInstance();
    }

    protected prepareAuthorizationHeader = (bearer: boolean = true) =>
        bearer ?
            `Bearer ${this.accessToken}` :
            this.accessToken;

    protected getAccessToken = () => {
        request
            .post('https://www.strava.com/oauth/token', {
                form: {
                    client_id: this.credentials.clientId,
                    client_secret: this.credentials.clientSecret,
                    code: '0a8759e7587eeb5bc7ece6b861fef006883d4284',
                    grant_type: this.credentials.grantType
                }
            })
            .then((response: any) => {
                console.log(response);
            })
    }
}
